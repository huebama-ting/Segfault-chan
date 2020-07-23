const db = require('../db');
const chalk = require('chalk');

module.exports = {
    name: 'servant',
    aliases: ['serv'],
    description: 'Retrieve servant information entry',
    args: true,
    parameters: 1,
    usage: '<name/nickname/id #>',
    async execute(msg, args) {
        const constructPreparedStatement = (param) => {
            if (param.match(/[0-9]/g) === null) {
                return {
                    query: `SELECT * FROM fgo_servant WHERE name_en = ? OR name_jp = ? OR name_en LIKE CONCAT('%', ?, '%') OR name_jp LIKE CONCAT('%', ?, '%') OR nick LIKE CONCAT('%', ?, '%')`,
                    args: [param, param, param, param, param]
                };    
            }

            return {
                query: `SELECT * FROM fgo_servant WHERE id = ?`,
                args: [param]
            };
        };
        const fullPrepStmt = constructPreparedStatement(args[0]);

        try {        
            const t = await db.executeQuery(fullPrepStmt.query, fullPrepStmt.args);
            msg.client.extLog.log('info', chalk.blue(JSON.stringify(t)));
        } catch (err) {
            msg.client.extLog.error(chalk.red(err));
        }
    }
};