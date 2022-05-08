import { Client, Intents } from 'discord.js';

import { token } from 'src/config/config.json';
import { logger } from 'src/logger/logger';
import { readFiles } from 'src/shared/utils';
import { isEvent } from 'src/shared/type-predicates';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

configureListeners();

client.login(token);

function configureListeners(): void {
  const eventFiles = readFiles('src/events');

  for (const file of eventFiles) {
    import(`src/events/${file}`).then((eventFile) => {
      const event = eventFile.event;

      if (isEvent(event)) {
        if (event.once) {
          client.once(event.name, (...args: unknown[]) => event.execute(...args));
        } else {
          client.on(event.name, (...args: unknown[]) => event.execute(...args));
        }
      } else {
        logger.error(`${file} does not contain an event.`);
      }
    });
  }
}
