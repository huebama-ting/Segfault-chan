import { prefix, token } from '../config.json';

import { readdirSync } from 'fs';
import { Collection, Client, Message } from 'discord.js';
import { transports, createLogger, format, Logger } from 'winston';
import { blue, bgRed, red, yellow } from 'chalk';
import Command from './interfaces/command';

export default class Bot {
  private client: Client;
  private logger: Logger;
  private commands: Collection<string, Command>;

  constructor() {
    const errorHunter = format(info => {
      if (info.error != null) {
        return info;
      }
        
      const splat = info.splat || [];
      info.error = splat.find((obj: any) => obj instanceof Error);
        
      return info;
    });
    const errorPrinter = format(info => {
      if (info.error == null) {
        return info;
      }
      
      // Handle case where Error has no stack.
      const errorMsg = info.error.stack || info.error.toString();
      info.message += `\n${errorMsg}`;
      
      return info;
    });
    const winstonConsoleFormat = format.combine(
      errorHunter(),
      errorPrinter(),
      format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`));
      
    this.client = new Client();
    this.logger = createLogger({
      level: 'silly',
      transports: [
        new transports.Console(),
        new transports.File({ filename: '../logs/bot.log' }),
        new transports.File({ filename: '../logs/bot_error.log', level: 'error' }),
      ],
      format: winstonConsoleFormat,
    });
    this.commands = this.initializeCommands();
  }

  private smartSplit(str: string, sep: RegExp, n: number): string[] {
    // Don't split if there are no arguments 
    if (str.match(/ .+/g) === null) {
      return [str];
    }
        
    const out = [];

    for (; n > 0; n--) {
      out.push(str.slice(sep.lastIndex, sep.exec(str)?.index));
    }

    out.push(str.slice(sep.lastIndex));
        
    return out;
  }

  private getAlias(cmd: any): string {
    let aliasMsg = `${prefix}${cmd.name}`;

    for (const alias of cmd.aliases) {
      aliasMsg += ` / ${prefix}${alias}`;
    }
  
    return aliasMsg;
  }

  private initializeCommands() {
    const commands = new Collection<string, any>();
    const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.ts'));

    // Load commands from file
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      commands.set(command.command.name, command.command);
    }
    return commands;
  }

  private intialize() {
    // Initialize logger
    this.client.on('ready', () => {
      this.client.user?.setPresence({ activity: { name: 'with oof' }, status: 'online' }).catch(err => this.logger.log('error', red(err)));
      this.logger.log('info', 'Bot initialized!');
    });
    this.client.on('debug', (msg: string) => this.logger.log('debug', blue(msg)));
    this.client.on('warn', (msg: string) => this.logger.log('warn', yellow(msg)));
    this.client.on('error', (err: Error) => this.logger.log('error', red(err)));
    process.on('uncaughtException', (err: Error) => this.logger.error(bgRed(err)));

    // Command event listener
    this.client.on('message', (msg: Message) => {
      if (!msg.content.startsWith(prefix) || msg.author.bot) {
        return;
      }

      const args = this.smartSplit(msg.content, / +/g, 1);
      const command = args.shift();

      if (command == null) {
        return;
      }

      const cmdName = command.slice(prefix.length).trim().toLowerCase();
      const cmd = this.commands.get(cmdName) || this.commands.find((alias: any) => alias.aliases && alias.aliases.includes(cmdName));
      
      if (cmd == null) {
        return msg.reply('I\'m sorry, I don\'t know that command!');
      }

      if (cmd.args && args.length === 0 || args.length !== cmd.parameters) {
        let usageMsg = 'you didn\'t provide the correct argument(s)!';

        if (cmd.usage != null) {
          usageMsg += `\nUsage: \`${this.getAlias(cmd)} ${cmd.usage}\``;
        }

        return msg.reply(usageMsg);
      }

      try {
        cmd.execute(msg, this.logger, args);
      } catch (err) {
        this.logger.error(red(err));
        msg.reply('There was an error when executing that command!');
      }
    });
  }

  public start(): void {
    this.intialize();
    this.client.login(token);
  }
}