import {
  bold,
  italic,
  SlashCommandBuilder
} from '@discordjs/builders';
import dayjs from 'dayjs';
import {
  MessageActionRow,
  MessageButton,
  MessageEmbed
} from 'discord.js';
import { v4 as uuidv4 } from 'uuid';

import { apiBaseUrl } from 'src/config/config.json';
import { Definition } from 'src/models/urban-dictionary/definition.model';
import { httpService } from 'src/services/http/http.service';
import { removeCharacters, trim } from 'src/shared/utils';

import { Command } from './models/command.model';

const URBAN_DICTIONARY_ENDPOINT = 'api/v1/urbanDictionary/define';
const REACTION_TIMEOUT = 60000;

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
    const response = await httpService.get<Definition[]>(`${apiBaseUrl}/${URBAN_DICTIONARY_ENDPOINT}?${query}`);

    if (response.length === 0) {
      return await interaction.reply(`No results found for ${italic(bold(term))}.`);
    }
    
    let embed = createEmbed(term, response, 0, response.length);
    const forwardUuid = uuidv4();
    const backwardUuid = uuidv4();
    const buttons = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(backwardUuid)
          .setLabel('◀️')
          .setStyle('PRIMARY'),
          new MessageButton()
          .setCustomId(forwardUuid)
          .setLabel('▶️')
          .setStyle('PRIMARY')
      );

    interaction.reply({ components: [buttons], embeds: [embed] });

    const collector = interaction.channel?.createMessageComponentCollector({ componentType: 'BUTTON', time: REACTION_TIMEOUT });
    let index = 0;

    collector?.on('collect', async (buttonInteraction) => {
      if (buttonInteraction.customId === forwardUuid) {
        index++;
      } else if (buttonInteraction.customId === backwardUuid) {
        index--;
      } else {
        return;
      }

      if (index === response.length) {
        index = 0;
      } else if (index < 0) {
        index = response.length - 1;
      }

      embed = createEmbed(term, response, index, response.length);

      await buttonInteraction.update({ components: [buttons], embeds: [embed] });
    });

    collector?.on('end', async () => {
      await interaction.editReply({ components: [] });
    });
  }
};

function calculateRating(thumbsUp: number, thumbsDown: number): number {
  const total = thumbsUp + thumbsDown;

  if (total === 0) {
    return 0;
  }

  return (thumbsUp / total) * 100;
}

function createEmbed(term: string, results: Definition[], index: number, size: number): MessageEmbed {
  return new MessageEmbed()
    .setTitle(term)
    .setURL(results[index].permalink)
    .setAuthor({
      name: results[index].author
    })
    .setTimestamp(dayjs(results[index].written_on).toDate())
    .addFields(
      {
        name: 'Definition',
        value: trim(removeCharacters(results[index].definition, '[]'), 1024)
      },
      {
        name: 'Example',
        value: trim(removeCharacters(results[index].example, '[]'), 1024)
      }, 
      {
        name: 'Rating',
        value: `${results[index].thumbs_up} ${results[index].thumbs_up === 1 ? 'thumb' : 'thumbs'} up
          ${results[index].thumbs_down} ${results[index].thumbs_down === 1 ? 'thumb' : 'thumbs'} down`
      },
      {
        name: 'Approval',
        value: `${calculateRating(results[index].thumbs_up, results[index].thumbs_down).toFixed(2)}%`
      }
    )
    .setColor('RANDOM')
    .setFooter({ text: `${index + 1}/${size}` });
}
