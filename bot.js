'use strict';

const { prefix, token } = require('./config.json');
const fs = require('fs');
const discord = require('discord.js');
const winston = require('winston');
const chalk = require('chalk');
const tripleBeam = require('triple-beam');
const client = new discord.Client();
const errorHunter = winston.format(info => {
    if (info.error != null) {
        return info;
    }

    const splat = info[tripleBeam.SPLAT] || [];
    info.error = splat.find(obj => obj instanceof Error);

    return info;
});
const errorPrinter = winston.format(info => {
    if (info.error == null) {
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
    winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`));
const logger = winston.createLogger({
    level: 'silly',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './logs/bot.log' }),
        new winston.transports.File({ filename: './logs/bot_error.log', level: 'error' }),
    ],
    format: winstonConsoleFormat,
});

// Split the command from the arguments
const smartSplit = (str, sep, n) => {
    // Don't split if there are no arguments 
    if (str.match(/ .+/g) === null) {
        return [str];
    }
    
    const out = [];

    for (; n > 0; n--) {
        out.push(str.slice(sep.lastIndex, sep.exec(str).index));
    }

    out.push(str.slice(sep.lastIndex));
    
    return out;
};

// Get command's aliases
const getAlias = (cmd) => {
    let aliasMsg = `${prefix}${cmd.name}`;

    for (const alias of cmd.aliases) {
        aliasMsg += ` / ${prefix}${alias}`;
    }

    return aliasMsg;
};

// Initialize logger
client.on('ready', () => {
    client.user.setPresence({ activity: { name: 'with oof' }, status: 'online' }).catch(console.error);
    logger.log('info', 'Bot initialized!');
});
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

    const args = smartSplit(msg.content, / +/g, 1);
    const cmdName = args.shift().slice(prefix.length).trim().toLowerCase();
    const cmd = client.commands.get(cmdName) || client.commands.find(alias => alias.aliases && alias.aliases.includes(cmdName));

    if (cmd == null) {
        return msg.reply('I\'m sorry, I don\'t know that command!');
    }

    if (cmd.args != null && args.length === 0 || args.length !== cmd.parameters) {
        let usageMsg = 'you didn\'t provide the correct argument(s)!';

        if (cmd.usage != null) {
            usageMsg += `\nUsage: \`${getAlias(cmd)} ${cmd.usage}\``;
        }

        return msg.reply(usageMsg);
    }

    try {
        cmd.execute(msg, args);
    } catch (err) {
        logger.error(chalk.red(err));
        msg.reply('There was an error when executing that command!');
    }
});

// Bot token passed in from config file
client.login(token);
