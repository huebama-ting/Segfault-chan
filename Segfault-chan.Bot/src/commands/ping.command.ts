import { SlashCommandBuilder } from '@discordjs/builders';

import { Command } from './models/command.model';

export const command: Command = {
	data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction): Promise<void> {
    await interaction.reply('Pong!');
	}
};
