import { logger } from 'src/logger/logger';
import { isError } from 'src/shared/type-predicates';

import { Event } from './models/event.model';

export const event: Event = {
  name: 'debug',
  once: false,
  execute(error: unknown) {
    if (isError(error)) {
      logger.debug(error);
    }
  }
};
