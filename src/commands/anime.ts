import { aniApiUrl } from '../../config.json';
import { handleResponse, logError, sendReply, formatInfo, formatDescription, formatGenres } from '../common/helpers';
import { SEASONS } from '../common/seasons';
import { SOURCES } from '../common/sources';
import { STATUSES } from '../common/statuses';
import Command from '../interfaces/command';

import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { Logger } from 'winston';

export const command: Command = {
  name: 'anime',
  aliases: ['ani'],
  description: 'Retrieve anime information entry',
  args: true,
  parameters: 1,
  usage: '<name of anime>',
  execute(msg: Message, args: string[], logger: Logger) {
    const makeEmbed = (info: any) => {
      const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle(info.data.Media.title.english ?? info.data.Media.title.romaji ?? info.data.Media.title.native)
        .setDescription(info.data.Media.title.romaji + ' / ' + info.data.Media.title.native)
        .setThumbnail(info.data.Media.coverImage.medium)
        .addFields(
          { name: '\u200b', value: '\u200b', inline: false },
          { name: 'Description', value: formatDescription(info.data.Media.description), inline: false },
          { name: 'Format', value: formatInfo(info.data.Media.format), inline: true },
          { name: 'Episodes', value: formatInfo(info.data.Media.episodes), inline: true },
          { name: 'Status', value: STATUSES.get(info.data.Media.status), inline: true },
          { name: 'Season', value: SEASONS.get(info.data.Media.season) + ' ' + info.data.Media.seasonYear, inline: true },
          { name: 'Studio', value: formatStudio(info.data.Media.studios.nodes), inline: true },
          { name: 'Genres', value: formatGenres(info.data.Media.genres), inline: true },
          { name: 'Average Score', value: formatInfo(info.data.Media.averageScore) !== 'N/A' ? formatInfo(info.data.Media.averageScore) + '%' : formatInfo(info.data.Media.averageScore), inline: true },
          { name: 'Source', value: SOURCES.get(info.data.Media.source), inline: true }
        );
      sendReply(msg, embed, logger);
    };
    const formatStudio = (array: any) => {
      let formattedString = '';
  
      for (const str of array) {
        formattedString += str.name + ', ';
      }
  
      formattedString = formattedString.slice(0, formattedString.length - 2);
  
      if (formattedString.length === 0 || formattedString === ' ') {
        formattedString = 'N/A';
      }
  
      return formattedString;
    };
    const query = `
        query getAnimeByName ($search: String) {
          Media (search: $search, type: ANIME) {
            title {
              english
              romaji
              native
            }
            format
            episodes
            status(version: 2)
            season
            seasonYear
            description
            coverImage {
              medium
            }
            genres
            studios(isMain: true) {
              nodes {
                name
              }
            }
            averageScore
            source(version: 2) 
          }
        }
      `;
    const variables = {
      search: args[0]
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    };
  
    fetch(aniApiUrl, options).then(handleResponse).then(makeEmbed).catch((err: Error) => logError(err, logger));
  }
};
