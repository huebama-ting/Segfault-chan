'use strict';

const { prefix, token } = require('./config.json');
const fs = require('fs');
const discord = require('discord.js');
const winston = require('winston');
const chalk = require('chalk');
const db = require('mysql2');
const client = new discord.Client();
const logger = winston.createLogger({
    level: 'silly',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './logs/bot.log' }),
        new winston.transports.File({ filename: './logs/bot_error.log', level: 'error' }),
    ],
    format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

// Initialize logger
client.on('ready', () => logger.log('info', 'Bot initialized!'));
client.on('debug', msg => logger.log('debug', chalk.blue(msg)));
client.on('warn', msg => logger.log('warn', chalk.orange(msg)));
client.on('error', msg => logger.log('error', chalk.red(msg)));
process.on('uncaughtException', err => logger.log('error', chalk.bgRed(err)));

client.extLog = logger;
client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

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
        logger.log('error', chalk.red(err));
        msg.reply('There was an error when executing that command!');
    }
});

// Bot token passed in from config file
client.login(token);