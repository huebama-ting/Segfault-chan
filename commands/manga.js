'use strict';

const { apiUrl } = require('../config.json');
const { handleResponse, logError, sendReply, formatInfo, formatDescription, formatGenres } = require('../common/helpers');

const discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'manga',
    aliases: ['man'],
    description: 'Retrieve manga information entry',
    args: true,
    parameters: 1,
    usage: '<name of manga>',
    async execute(msg, args) {
        const makeEmbed = (info) => {
            const embed = new discord.MessageEmbed()
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
                { name: 'Status', value: formatInfo(info.data.Media.status), inline: true },
                { name: 'Genres', value: formatGenres(info.data.Media.genres), inline: true },
                { name: 'Average Score', value: formatInfo(info.data.Media.averageScore) !== 'N/A' ? formatInfo(info.data.Media.averageScore) + '%' : formatInfo(info.data.Media.averageScore), inline: true },
                { name: 'Source', value: formatInfo(info.data.Media.source), inline: true }
            );
            sendReply(msg, embed);
        };
        const query = `
        query getMangaByName ($search: String) {
            Media (search: $search, type: MANGA, sort: ID) {
                title {
                    english
                    romaji
                    native
                  }
                format
                status(version: 2)
                chapters
                volumes
                description
                coverImage {
                    medium
                }
                genres
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

        fetch(apiUrl, options).then(handleResponse).then(makeEmbed).catch(logError);
    }
};
