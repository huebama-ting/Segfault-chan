import { Interaction } from 'discord.js';

import { commands } from 'src/commands/commands';
import { isInteraction } from 'src/shared/type-predicates';

import { Event } from './models/event.model';

export const event: Event = {
  name: 'interactionCreate',
  once: false,
  async execute(interaction: unknown) {
    if (isInteraction(interaction)) {
      await handleInteraction(interaction);
    }
  }
};

async function handleInteraction(interaction: Interaction) {
  if (!interaction.isCommand()) {
    return;
  }

  const command = commands.get(interaction.commandName);

  if (command === undefined) {
    return;
  }

  try {
    await command.execute(interaction);
  } catch (err) {
    await interaction.reply({ content: 'An error occured while executing this command.', ephemeral: true });
  }
}
