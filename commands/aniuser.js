'use strict';

const { apiUrl } = require('../config.json');
const { handleResponse, logError, sendReply, formatInfo } = require('../common/helpers');

const discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'aniuser',
    aliases: ['au'],
    description: 'Retrieve AniList user information entry',
    args: true,
    parameters: 1,
    usage: '<name of user>',
    async execute(msg, args) {
        const makeEmbed = (info) => {
            const embed = new discord.MessageEmbed()
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
            sendReply(msg, embed);
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
            name: args[0]
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

        fetch(apiUrl, options).then(handleResponse).then(makeEmbed).catch(logError);
    }
};
