import { red } from 'chalk';
import { Message, MessageEmbed } from 'discord.js';
import { Response } from 'node-fetch';
import { Logger } from 'winston';

export function handleResponse(response: Response): any | Promise<never> {
  return response.json().then((json: any) => {
    return response.ok ? json : Promise.reject(json);
  });
}

export function logError(err: Error, logger: Logger): void {
  logger.error(red(err));
}

export function sendReply(msg: Message, embed: MessageEmbed, logger: Logger): void {
  try {
    msg.channel.send(embed);
  } catch (err) {
    logger.error(red(err));
  }
}

export function formatInfo(str: string | undefined): string {
  if (str == null) {
    return 'N/A';
  }

  return str;
}

export function formatDescription(description: string): string {
  if (description === null) {
    return 'N/A';
  }

  return description.replace(/(<br>)+/g, '\u000a').trim();
}

export function formatGenres(genres: string[]): string {
  let formattedString = '';

  for (const str of genres) {
    formattedString += str + ', ';    
  }

  formattedString = formattedString.slice(0, formattedString.length - 2);

  if (formattedString.length === 0 || formattedString === ' ') {
    formattedString = 'N/A';
  }

  return formattedString;
}
