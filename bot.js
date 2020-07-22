'use strict';

const { prefix, token } = require('./config.json');
const fs = require('fs');
const discord = require('discord.js');
const winston = require('winston');
const chalk = require('chalk');
const sql = require('mysql2/promise');
const db = require('./db');
const tripleBeam = require('triple-beam')
const client = new discord.Client();
const errorHunter = winston.format(info => {
    if (info.error) {
        return info;
    }

    const splat = info[tripleBeam.SPLAT] || [];
    info.error = splat.find(obj => obj instanceof Error);

    return info;
});
const errorPrinter = winston.format(info => {
    if (!info.error) {
        return info;
    }

    // Handle case where Error has no stack.
    const errorMsg = info.error.stack || info.error.toString();
    info.message += `\n${errorMsg}`;

    return info;
});
const winstonConsoleFormat = winston.format.combine(
    errorHunter(),
    errorPrinter(),
    winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`)
);
const logger = winston.createLogger({
    level: 'silly',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './logs/bot.log' }),
        new winston.transports.File({ filename: './logs/bot_error.log', level: 'error' }),
    ],
    format: winstonConsoleFormat,
});

/*(async () => {
    connection = await sql.createConnection({
        host: 'localhost',
        user: dbUser,
        password: dbPass,
        database: dbName
    });
    a();
})();
*/
// Initialize logger
client.on('ready', () => logger.log('info', 'Bot initialized!'));
client.on('debug', msg => logger.log('debug', chalk.blue(msg)));
client.on('warn', msg => logger.log('warn', chalk.orange(msg)));
client.on('error', err => logger.log('error', chalk.red(err)));
process.on('uncaughtException', err => logger.error(chalk.bgRed(err)));

// Initialze commands
client.extLog = logger;
client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Load commands from file
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Command event listener
client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) {
        return;
    }

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    if (!client.commands.has(cmdName)) {
        return;
    }

    const cmd = client.commands.get(cmdName);

    try {
        cmd.execute(msg, args);
    } catch (err) {
        logger.error(chalk.red(err));
        msg.reply('There was an error when executing that command!');
    }
});

// Bot token passed in from config file
client.login(token);

