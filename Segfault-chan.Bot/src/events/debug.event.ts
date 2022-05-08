import { logger } from 'src/logger/logger';
import { isString } from 'src/shared/type-predicates';

import { Event } from './models/event.model';

export const event: Event = {
  name: 'debug',
  once: false,
  execute(message: unknown) {
    if (isString(message)) {
      logger.debug(message);
    }
  }
};
