import { Message } from 'discord.js';
import { Logger } from 'winston';

/**
 * Inferface detailing a Discord bot command, it's usage, parameters and implementation
 */
export default interface Command {
  /**
   * The name of the command
   */
  name: string,
  /**
   * Alternative names for the command, if any
   */
  aliases: string[],
  /**
   * A brief description of what the command does
   */
  description: string,
  /**
   * Does the command require additional parameters?
   */
  args: boolean,
  /**
   * The number of parameters that the command requires, if any
   */
  parameters: number,
  /**
   * A brief note on how to trigger the command, if required
   */
  usage?: string,
  /**
   * Executes a command
   * @param msg the Discord.js message that triggered the command
   * @param logger the bot's logger
   * @param args the arguments for the command, if any
   */
  execute(msg: Message, logger: Logger, args?: string[]): void
}
