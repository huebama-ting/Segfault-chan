import { Message } from 'discord.js';
import { Logger } from 'winston';

export default interface Command {
  name: string,
  aliases: string[],
  description: string,
  args: boolean,
  parameters: number,
  usage?: string,
  execute(msg: Message, args: string[], logger: Logger): void
};
