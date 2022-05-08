import { Collection } from 'discord.js';
import { logger } from 'src/logger/logger';
import { isCommand } from 'src/shared/type-predicates';
import { readFiles } from 'src/shared/utils';

import { Command } from './models/command.model';

export const commands: Collection<string, Command> = loadCommands();

function loadCommands(): Collection<string, Command> {
  const commands = new Collection<string, Command>();
  const commandFiles = readFiles('src/commands', '.command.ts');

  for (const file of commandFiles) {
    import(`src/commands/${file}`).then((commandFile) =>{
      const command = commandFile.command;
      if (isCommand(command)) {
        commands.set(commandFile.command.data.name, commandFile.command);
      } else {
        logger.error(`${file} does not contain a command.`);
      }
    });
  }

  return commands;
}
