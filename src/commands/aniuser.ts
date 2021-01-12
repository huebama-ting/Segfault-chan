import { aniApiUrl } from '../../config.json';
import { handleResponse, logError, sendReply, formatInfo } from '../common/helpers';
import Command from "../interfaces/command";

import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { Logger } from "winston";

export const command: Command = {
  name: 'aniuser',
  aliases: ['au'],
  description: 'Retrieve AniList user information entry',
  args: true,
  parameters: 1,
  usage: '<name of user>',
  execute(msg: Message, logger: Logger, args?: string[]) {
    const makeEmbed = (info: any) => {
      const embed = new MessageEmbed()
        .setColor('#0000FF')
        .setTitle(info.data.User.name)
        .setThumbnail(info.data.User.avatar.medium)
        .addFields(
          { name: 'ID', value: info.data.User.id, inline: false },
          { name: 'About', value: formatInfo(info.data.User.about), inline: false },
          { name: 'Anime Watched', value: info.data.User.statistics.anime.count, inline: true },
          { name: 'Episodes Watched', value: info.data.User.statistics.anime.episodesWatched, inline: true },
          { name: 'Days Watched', value: (info.data.User.statistics.anime.minutesWatched / 1440).toPrecision(2), inline: true },
          { name: 'Anime Mean Score', value: info.data.User.statistics.anime.meanScore + '%', inline: true },
          { name: 'Manga Read', value: info.data.User.statistics.manga.count, inline: true },
          { name: 'Chapters Read', value: info.data.User.statistics.manga.chaptersRead, inline: true },
          { name: 'Volumes Read', value: info.data.User.statistics.manga.volumesRead, inline: true },
          { name: 'Manga Mean Score', value: info.data.User.statistics.manga.meanScore + '%', inline: true },
        );
      sendReply(msg, embed, logger);
    };
    const query = `
      query getMangaByName ($name: String) {
        User(name: $name, sort: USERNAME) {
          name
          id
          about
          avatar {
            medium
          }
          statistics {
            anime {
              count
              episodesWatched
              minutesWatched
              meanScore
            }
            manga {
              count
              chaptersRead
              volumesRead
              meanScore
            }
          }
        }
      }
    `;
    const variables = {
      name: args != null && args.length > 0 ? args[0] : ''
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