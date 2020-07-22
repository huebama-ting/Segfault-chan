const db = require('../db');
const chalk = require('chalk');

module.exports = {
    name: 'ping',
    description: 'Ping!',
    async execute(msg, args) {
        msg.client.extLog.log('info', 'Ping!');
        
        try {        
            const t = await db.executeQuery('SELECT name_en FROM fgo_servant WHERE id = 128');
            msg.client.extLog.log('info' chalk.blue(t));
        } catch (err) {
            msg.client.extLog.error(chalk.red(err));
        }
    }
};