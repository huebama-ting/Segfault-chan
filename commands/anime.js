const { apiUrl } = require('../config.json');
const discord = require('discord.js');
const chalk = require('chalk');
const fetch = require('node-fetch');

module.exports = {
    name: 'anime',
    aliases: ['ani'],
    description: 'Retrieve anime information entry',
    args: true,
    parameters: 1,
    usage: '<name of anime>',
    async execute(msg, args) {
        const handleResponse = (response) => {
            return response.json().then(json => {
                return response.ok ? json : Promise.reject(json);
            });
        };
        const sendReply = (info) => {
            console.log(info);
            const embed = new discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle(info.data.Media.title.english ?? info.data.Media.title.romaji ?? info.data.Media.title.native)
                .setDescription(info.data.Media.title.romaji + ' / ' + info.data.Media.title.native)
                .setThumbnail(info.data.Media.coverImage.medium)
                .addFields(
                    { name: '\u200b', value: '\u200b', inline: false },
                    { name: 'Description', value: formatDescription(info.data.Media.description), inline: false },
                    { name: 'Format', value: formatInfo(info.data.Media.format), inline: true },
                    { name: 'Episodes', value: formatInfo(info.data.Media.episodes), inline: true },
                    { name: 'Status', value: formatInfo(info.data.Media.status), inline: true },
                    { name: 'Season', value: info.data.Media.season + ' ' + info.data.Media.seasonYear, inline: true },
                    { name: 'Studio', value: formatStudio(info.data.Media.studios.nodes), inline: true },
                    { name: 'Genres', value: formatGenres(info.data.Media.genres), inline: true },
                    { name: 'Average Score', value: formatInfo(info.data.Media.averageScore) !== 'N/A' ? formatInfo(info.data.Media.averageScore) + '%' : formatInfo(info.data.Media.averageScore), inline: true },
                    { name: 'Source', value: formatInfo(info.data.Media.source), inline: true }
                );

            try {
                msg.channel.send(embed);
            } catch (err) {
                console.log(err);
            }
        };
        const logError = (error) => {
            console.log(error);
        };
        const formatDescription = (description) => {
            if (description === null) {
                return 'N/A';
            }

            return description.replace(/(<br>)+/g, '\u000a').trim();
        };
        const formatStudio = (array) => {
            let formattedString = '';

            for (const string of array) {
                formattedString += string.name + ', ';    
            }

            formattedString = formattedString.slice(0, formattedString.length - 2);

            if (formattedString.length === 0 || formattedString === ' ') {
                formattedString = 'N/A';
            }

            return formattedString;
        };
        const formatGenres = (array) => {
            let formattedString = '';

            for (const string of array) {
                formattedString += string + ', ';    
            }

            formattedString = formattedString.slice(0, formattedString.length - 2);

            if (formattedString.length === 0 || formattedString === ' ') {
                formattedString = 'N/A';
            }

            return formattedString;
        };
        const formatInfo = (data) => {
            if (data === null) {
                return 'N/A';
            }

            return data;
        }
        const query = `
        query getByName ($search: String) {
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

        fetch(apiUrl, options).then(handleResponse).then(sendReply).catch(logError);
    }
};