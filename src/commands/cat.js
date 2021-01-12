'use strict';

const { catApiUrl } = require('../../config.json');
const { handleResponse, logError } = require('../common/helpers');

const fetch = require('node-fetch');

module.exports = {
  name: 'cat',
  aliases: ['neko', 'nya', 'meow'],
  description: 'Get a random image of a cat',
  args: false,
  parameters: 0,
  execute(msg) {
    const sendCat = (res) => {
      msg.channel.send(res.file);
    };
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    fetch(catApiUrl, options).then(handleResponse).then(sendCat).catch(logError);
  }
};
