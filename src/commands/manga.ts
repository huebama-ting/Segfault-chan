'use strict';
import { aniApiUrl } from '../../config.json';
import { handleResponse, logError, sendReply, formatInfo, formatDescription, formatGenres } from '../common/helpers';
import { mangaQuery } from "../common/queries";
import { SOURCES } from '../common/sources';
import { STATUSES } from '../common/statuses';
import Command from "../interfaces/command";

import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { Logger } from "winston";

export const command: Command = {
  name: 'manga',
  aliases: ['man'],
  description: 'Retrieve manga information entry',
  args: true,
  parameters: 1,
  usage: '<name of manga>',
  execute(msg: Message, logger: Logger, args?: string[]) {
    const makeEmbed = (info: any) => {
      const embed = new MessageEmbed()
        .setColor('#FF00FF')
        .setTitle(info.data.Media.title.english ?? info.data.Media.title.romaji ?? info.data.Media.title.native)
        .setDescription(info.data.Media.title.romaji + ' / ' + info.data.Media.title.native)
        .setThumbnail(info.data.Media.coverImage.medium)
        .addFields(
          { name: '\u200b', value: '\u200b', inline: false },
          { name: 'Description', value: formatDescription(info.data.Media.description), inline: false },
          { name: 'Format', value: formatInfo(info.data.Media.format), inline: true },
          { name: 'Chapters', value: formatInfo(info.data.Media.chapters), inline: true },
          { name: 'Volumes', value: formatInfo(info.data.Media.volumes), inline: true },
          { name: 'Status', value: STATUSES.get(info.data.Media.status), inline: true },
          { name: 'Genres', value: formatGenres(info.data.Media.genres), inline: true },
          { name: 'Average Score', value: formatInfo(info.data.Media.averageScore) !== 'N/A' ? formatInfo(info.data.Media.averageScore) + '%' : formatInfo(info.data.Media.averageScore), inline: true },
          { name: 'Source', value: SOURCES.get(info.data.Media.source), inline: true }
        );
      sendReply(msg, embed, logger);
    };
    const variables = {
      search: args != null && args.length > 0 ? args[0] : ''
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query: mangaQuery,
        variables: variables
      })
    };

    fetch(aniApiUrl, options).then(handleResponse).then(makeEmbed).catch((err: Error) => logError(err, logger));
  }
};
