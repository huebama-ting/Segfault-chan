import { logger } from 'src/logger/logger';
import { isClient } from 'src/shared/type-predicates';

import { Event } from './models/event.model';

export const event: Event = {
  name: 'ready',
  once: true,
  execute(client: unknown): void {
    if (isClient(client)) {
      logger.info(`Bot logged in as ${client.user?.tag}.`);
    }
  }
};
