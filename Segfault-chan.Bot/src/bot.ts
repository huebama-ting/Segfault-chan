import { Client, Intents } from 'discord.js';

import { token } from 'src/config/config.json';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log('Ready!');
});

client.login(token);
