import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord-api-types/v9';

import {
  clientId,
  guildIds,
  token
} from 'src/config/config.json';
import { logger } from 'src/logger/logger';
import { readFiles } from 'src/shared/utils';

const rest = new REST({ version: '9' }).setToken(token);

guildIds.forEach(async (guildId) => {
  const commands = await loadCommands();

  rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => logger.info(`Successfully registered application commands for guild ${guildId}.`))
    .catch((err) => logger.error(err));
});

async function loadCommands(): Promise<RESTPostAPIApplicationCommandsJSONBody[]> {
  const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];
  const commandFiles = readFiles('src/commands', '.command.ts');

  for (const file of commandFiles) {
    const commandFile = await import(`./commands/${file}`);
    commands.push((commandFile.command.data as SlashCommandBuilder).toJSON());
  }

  return commands;
}
