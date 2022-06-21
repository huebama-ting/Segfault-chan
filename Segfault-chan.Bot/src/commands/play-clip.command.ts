import { SlashCommandBuilder, userMention } from '@discordjs/builders';
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
  StreamType
} from '@discordjs/voice';
import { GuildMember, VoiceBasedChannel } from 'discord.js';

import { logger } from 'src/logger/logger';

import { Command } from './models/command.model';

enum Clip {
  MorseCode,
  GarandPing
}

export const command: Command = {
  data: new SlashCommandBuilder()
    .addStringOption((option) =>
      option.setName('clip')
        .setDescription('The clip to play.')
        .addChoices({ name: 'Morse code', value: Clip[Clip.MorseCode] })
        .addChoices({ name: 'Garand ping', value: Clip[Clip.GarandPing] })
        .setRequired(true))
    .setName('play-clip')
    .setDescription('Plays a sound clip.'),
  async execute(interaction): Promise<void> {
    const channel = (interaction.member as GuildMember).voice.channel as VoiceBasedChannel;

    if (channel === null) {
      return await interaction.reply(`${userMention(interaction.user.id)}, you must be connected to a voice channel to use this command.`);
    }

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
      selfDeaf: false
    });
    const player = createAudioPlayer();
    const subscription = connection.subscribe(player);
    const clipName = interaction.options.getString('clip', true);
    const clipNumber = Clip[clipName as keyof typeof Clip];
    const clip = `assets/sound-clips/${clipNumber}.ogg`;
    const resource = createAudioResource(clip, {
      inputType: StreamType.OggOpus
    });

    player.on('error', (err) => {
      logger.error(`Error: ${err.message} on track ${clip}`);
    });
    player.on(AudioPlayerStatus.Buffering, async () => {
      await interaction.reply(`Now loading clip: ${clipName}...`);
    });

    player.play(resource);
    
    player.on(AudioPlayerStatus.Playing, async () => {
      await interaction.editReply(`Now playing clip: ${clipName}...`);
    });
    player.on(AudioPlayerStatus.Idle, async (oldState) => {
      if (oldState.status === AudioPlayerStatus.Playing) {
        await interaction.editReply(`Completed playing clip: ${clipName}.`);
        setTimeout(() => {
          player.stop();
          subscription?.unsubscribe();
          connection.disconnect();
          connection.destroy();
        }, 1000);
      }
    });
  }
};
