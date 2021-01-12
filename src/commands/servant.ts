import { executeQuery } from '../common/db';
import Command from '../interfaces/command';

import chalk from 'chalk';
import { Message, MessageEmbed } from 'discord.js';
import { Logger } from 'winston';

export const command: Command = {
  name: 'servant',
  aliases: ['serv'],
  description: 'Retrieve servant information entry',
  args: true,
  parameters: 1,
  usage: '<name/nickname/id #>',
  async execute(msg: Message, logger: Logger, args?: string[]) {
    const constructPreparedStatement = (param: string) => {
      // Argument was a name
      if (param.match(/[0-9]/g) === null) {
        return {
          query: `SELECT * FROM fgo_servant WHERE name_en = ? OR name_jp = ? OR name_en LIKE CONCAT('%', ?, '%') OR name_jp LIKE CONCAT('%', ?, '%') OR nick LIKE CONCAT('%', ?, '%')`,
          args: [param, param, param, param, param]
        };    
      }

      // Argument was an ID
      return {
        query: `SELECT * FROM fgo_servant WHERE id = ?`,
        args: [param]
      };
    };

    // Format the servant data into a nice format for an embed
    const formatInfo = (servant: any) => {
      return `**ID: **${servant.id}\n**Class: **${servant.class}\n**Rarity: **${servant.rarity}\n**Max HP: **${servant.hp}\n**Max ATK: **${servant.atk}\n**Traits: **${servant.traits}\n**Illustrator: **${servant.illust}\n**CV: **${servant.cv}\n**Alignment: **${servant.align}\n**Height / Weight: **${servant.ht_wt}\n**Gender: **${servant.gender}\n**Nicknames: **${servant.nick}\n**Attribute: **${servant.attrib}`;  
    };

    const formatStatus = (servant: any) => {
      let status = '';

      if (servant.event) {
        status += 'https://grandorder.wiki/images/thumb/e/e5/Icon_Gift.png/20px-Icon_Gift.png';
      } else if (servant.limited) {
        status += 'https://grandorder.wiki/images/2/29/Icon_Star.png';
      } else if (servant.story_lock) {
        status += 'https://grandorder.wiki/images/0/07/Icon_Lock.png';
      }

      return status;
    };
    const fullPrepStmt = constructPreparedStatement(args != null && args.length > 0 ? args[0] : '');
    let servants;

    try {        
      servants = await executeQuery(fullPrepStmt.query, fullPrepStmt.args);
    } catch (err) {
      logger.error(chalk.red(err));
    }

    if (servants.length === 0) {
      return msg.reply('no servants were found!');
    } else if (servants.length === 1) {
      const embed = new MessageEmbed()
        .setColor('#FF00FF')
        .setAuthor(servants[0].name_en, formatStatus(servants[0]))
        .setDescription(servants[0].name_jp)
        .setThumbnail(servants[0].img)
        .addFields({ name: '\nProfile\n', value: formatInfo(servants[0]), inline: false });
      msg.channel.send(embed);
    }
  }
};
