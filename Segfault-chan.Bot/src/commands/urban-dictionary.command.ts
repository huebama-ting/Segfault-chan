import { SlashCommandBuilder } from '@discordjs/builders';
import dayjs from 'dayjs';
import { MessageEmbed } from 'discord.js';

import { apiBaseUrl } from 'src/config/config.json';
import { Definition } from 'src/models/urban-dictionary/definition.model';
import { httpService } from 'src/services/http/http.service';
import { Command } from './models/command.model';

export const command: Command = {
  data: new SlashCommandBuilder()
    .addStringOption((option) =>
      option.setName('term')
        .setDescription('The term to get the definitions for.')
        .setRequired(true))
    .setName('urban-dictionary')
    .setDescription('Gets definitions of a term from Urban Dictionary.'),
  async execute(interaction): Promise<void> {
    const term = interaction.options.getString('term') as string;
    const query = new URLSearchParams({ term });

    const response = await httpService.get<Definition[]>(`${apiBaseUrl}/api/v1/urbanDictionary/define?${query}`);
    
    if (response.length === 0) {
      return await interaction.reply(`No results found for **${term}**.`);
    }
    
    const result = response[0];

    if (result !== undefined) {
      const embed = new MessageEmbed()
        .setTitle(term)
        .setURL(result.permalink)
        .setAuthor({
          name: result.author
        })
        .setTimestamp(dayjs(result.written_on).toDate())
        .addFields(
          {
            name: 'Definition',
            value: result.definition
          },
          {
            name: 'Example',
            value: result.example
          }, 
          {
            name: 'Rating',
            value: `${result.thumbs_up} thumbs up.\n${result.thumbs_down} thumbs down.`
          });

      interaction.reply({ embeds: [embed] });
    }
  }
};
