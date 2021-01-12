import { executeQuery } from '../common/db';
import Command from '../interfaces/command';

import { red } from 'chalk';
import { Message, MessageEmbed } from 'discord.js';
import { Logger } from 'winston';

export const command: Command = {
  name: 'craftessence',
  aliases: ['ce'],
  description: 'Retrieve craft essence information entry',
  args: true,
  parameters: 1,
  usage: '<name/id #>',
  async execute(msg: Message, logger: Logger, args?: string[]) {
    const constructPreparedStatement = (param: string) => {
      // Argument was a name
      if (param.match(/[0-9]/g) === null) {
        return {
          query: `SELECT * FROM fgo_ce WHERE name_en = ? OR name_jp = ? OR name_en LIKE CONCAT('%', ?, '%') OR name_jp LIKE CONCAT('%', ?, '%')`,
          args: [param, param, param, param]
        };    
      }

      // Argument was an ID
      return {
        query: `SELECT * FROM fgo_ce WHERE id = ?`,
        args: [param]
      };
    };

    // Format the CE data into a nice format for an embed
    const formatInfo = (ce: any) => {
      return `**ID: **${ce.id}\n**Rarity: **${ce.rarity}\n**Max HP: **${ce.hp}\n**Max ATK: **${ce.atk}\n**Effects:\n**${ce.effect}`;  
    };
    const fullPrepStmt = constructPreparedStatement(args != null && args.length > 0 ? args[0] : '');
    let ces;

    try {        
      ces = await executeQuery(fullPrepStmt.query, fullPrepStmt.args);
    } catch (err) {
      logger.error(red(err));
    }

    if (ces.length === 0) {
      return msg.reply('no craft essences were found!');
    } else if (ces.length === 1) {
      const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle(ces[0].name_en)
        .setDescription(ces[0].name_jp)
        .setThumbnail(ces[0].img)
        .addFields({ name: '\u200b', value: '\u200b', inline: false }, { name: '\nProfile\n', value: formatInfo(ces[0]), inline: false });
      msg.channel.send(embed);
    }
  }
};
