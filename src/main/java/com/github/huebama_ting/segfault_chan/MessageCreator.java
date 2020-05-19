/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.MessageBuilder;
import java.util.ArrayList;

/**
 * The {@code MessageCreator} class packages messages into an easy to send form for the bot.
 */
public class MessageCreator {

    private MessageBuilder msgBuilder;
    private EmbedBuilder ebdBuilder;

    /**
     * Constructs a {@code MessageCreator} object.
     */
    public MessageCreator() {
        msgBuilder = new MessageBuilder();
        ebdBuilder = new EmbedBuilder();
    }

    /**
     * Retrieves this {@code MessageCreator}'s {@code MessageBuilder}.
     * @return this instance's {@code MessageBuilder}
     */
    public MessageBuilder getMessageBuilder() {
        return msgBuilder;
    }

    /**
     * Retrieves this {@code MessageCreator}'s {@code EmbedBuilder}.
     * @return this instance's {@code EmbedBuilder}
     */
    public EmbedBuilder getEmbedBuilder() {
        return ebdBuilder;
    }

    /**
     * Create an message containing info from a {@link com.github.huebama_ting.segfault_chan.DBEntry}
     * @param entries the {@link java.util.ArrayList} containing the
     *                {@link com.github.huebama_ting.segfault_chan.DBEntry}'s to send as a message.
     */
    public void createMessage(ArrayList<DBEntry> entries) {
        msgBuilder.clear();

        msgBuilder.append("**");
        entries.forEach(dbe -> msgBuilder.append(dbe.getInfoNewline()));
        msgBuilder.append("**");
    }

    /**
     * Create an message containing the passed in {@link java.lang.String}.
     * @param text the text to send as a message.
     */
    public void createMessage(String text) {
        msgBuilder.clear();
        msgBuilder.append(text);
    }

    /**
     * Create an embed containing info from a {@link com.github.huebama_ting.segfault_chan.DBEntry}
     * @param entries the {@link com.github.huebama_ting.segfault_chan.DBEntry} to send as an embed.
     */
    public void createEmbed(ArrayList<DBEntry> entries, int index) {
        ebdBuilder.clear();

        if (entries.get(index) instanceof Servant) {
            setupServant((Servant) entries.get(index));
        } else {
            setupCE((CraftEssence) entries.get(index));
        }

        ebdBuilder.setFooter((entries.indexOf(entries.get(index)) + 1) + "/" + entries.size());
    }

    public void createEmbed(DBEntry entry) {
        ebdBuilder.clear();

        if (entry instanceof Servant) {
            setupServant((Servant) entry);
        } else {
            setupCE((CraftEssence) entry);
        }
    }

    /**
     * Packages the passed in {@link com.github.huebama_ting.segfault_chan.Servant} to a embed.
     * @param servant the {@link com.github.huebama_ting.segfault_chan.Servant} to send as an embed.
     */
    private void setupServant(Servant servant) {
        ebdBuilder.setThumbnail(servant.getImg());
        ebdBuilder.setColor(65535);
        ebdBuilder.setTitle(servant.getEnName());
        ebdBuilder.setDescription(servant.getJpName());
        ebdBuilder.addField("", servant.toString(), false);
    }

    /**
     * Packages the passed in {@link com.github.huebama_ting.segfault_chan.CraftEssence} to a embed.
     * @param ce the {@link com.github.huebama_ting.segfault_chan.CraftEssence} to send as an embed.
     */
    private void setupCE(CraftEssence ce) {
        ebdBuilder.setThumbnail(ce.getImg());
        ebdBuilder.setColor(32768);
        ebdBuilder.setTitle(ce.getEnName());
        ebdBuilder.setDescription(ce.getJpName());
        ebdBuilder.addField("", ce.toString(), false);
    }

    private void setupUser(User user) {

    }
}
