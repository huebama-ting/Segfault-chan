import { SlashCommandBuilder } from '@discordjs/builders';

import { apiBaseUrl } from 'src/config/config.json';
import { RandomCat } from 'src/models/random-cat/random-cat.model';
import { httpService } from 'src/services/http/http.service';

import { Command } from './models/command.model';

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Gets a random image of a cat.'),
  async execute(interaction): Promise<void> {
    const response = await httpService.get<RandomCat>(`${apiBaseUrl}/api/v1/randomCat`);
    const catPicture = response.url;

    await interaction.reply(catPicture);
  }
};
