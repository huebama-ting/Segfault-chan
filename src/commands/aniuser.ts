import { aniApiUrl } from '../../config.json';
import { handleResponse, logError, sendReply, formatInfo } from '../common/helpers';
import { aniUserQuery } from '../common/queries';
import Command from '../interfaces/command'
import User from '../interfaces/json-objects/user';

import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { Logger } from 'winston';

export const command: Command = {
  name: 'aniuser',
  aliases: ['au'],
  description: 'Retrieve AniList user information entry',
  args: true,
  parameters: 1,
  usage: '<name of user>',
  execute(msg: Message, logger: Logger, args?: string[]) {
    const makeEmbed = (info: User) => {
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
        query: aniUserQuery,
        variables: variables
      })
    };

    fetch(aniApiUrl, options).then(handleResponse).then(makeEmbed).catch((err: Error) => logError(err, logger));
  }
};
