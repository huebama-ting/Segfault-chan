import { SlashCommandBuilder } from '@discordjs/builders';
import { REST, RouteLike } from '@discordjs/rest';
import { RESTGetAPIApplicationCommandResult } from 'discord-api-types/v10';
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord-api-types/v9';

import {
  clientId,
  guildIds,
  token
} from 'src/config/config.json';
import { logger } from 'src/logger/logger';
import { readFiles } from 'src/shared/utils';

const rest = new REST({ version: '9' }).setToken(token);

loadCommands().then((commands) => {
  guildIds.forEach((guildId) => {
    if (process.argv[2] === 'delete') {
      rest.get(Routes.applicationGuildCommands(clientId, guildId))
        .then((data) => {
          for (const command of data as RESTGetAPIApplicationCommandResult[]) {
            const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}` as RouteLike;

            rest.delete(deleteUrl).then(() => logger.info(`Successfully deleted application command ${command.id} for guild ${guildId}.`));
          }
        })
        .catch((err) => logger.error(err));
    } else {
      rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
      .then(() => logger.info(`Successfully registered application commands for guild ${guildId}.`))
      .catch((err) => logger.error(err));
    }
  });

  rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => logger.info('Successfully registered application commands.'))
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
