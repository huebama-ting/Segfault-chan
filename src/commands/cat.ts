import { catApiUrl } from '../../config.json';
import { handleResponse, logError } from '../common/helpers';
import Command from "../interfaces/command";

import { Message } from 'discord.js';
import fetch from 'node-fetch';
import { Logger } from "winston";

export const command: Command = {
  name: 'cat',
  aliases: ['neko', 'nya', 'meow'],
  description: 'Get a random image of a cat',
  args: false,
  parameters: 0,
  usage: '',
  execute(msg: Message, args: string[], logger: Logger) {
    const sendCat = (res: any) => {
      msg.channel.send(res.file);
    };
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    fetch(catApiUrl, options).then(handleResponse).then(sendCat).catch((err: Error) => logError(err, logger));
  }
};
