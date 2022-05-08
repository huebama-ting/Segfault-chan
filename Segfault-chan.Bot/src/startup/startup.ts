import { Client } from 'discord.js';

import { logger } from 'src/logger/logger';
import { isEvent } from 'src/shared/type-predicates';
import { readFiles } from 'src/shared/utils';

export function configureListeners(client: Client): void {
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
