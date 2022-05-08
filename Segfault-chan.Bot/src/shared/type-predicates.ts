import { Client, Interaction } from 'discord.js';

import { Command } from 'src/commands/models/command.model';
import { Event } from 'src/events/models/event.model';

export function isClient(client: unknown): client is Client {
  return (client as Client).on !== undefined;
}

export function isCommand(command: unknown): command is Command {
  return (command as Command).data !== undefined;
}

export function isError(error: unknown): error is Error {
  return (error as Error).stack !== undefined;
}

export function isEvent(event: unknown): event is Event {
  return (event as Event).execute !== undefined;
}

export function isInteraction(interaction: unknown): interaction is Interaction {
  return (interaction as Interaction).applicationId !== undefined;
}

export function isString(message: unknown): message is string {
  return typeof message === 'string';
}
