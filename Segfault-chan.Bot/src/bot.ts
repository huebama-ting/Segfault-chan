import { Client, Intents } from 'discord.js';

import { token } from 'src/config/config.json';
import { configureListeners } from 'src/startup/startup';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

configureListeners(client);

client.login(token);
