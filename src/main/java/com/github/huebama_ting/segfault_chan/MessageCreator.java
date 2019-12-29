package com.github.huebama_ting.segfault_chan;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.MessageBuilder;

import java.util.ArrayList;

public class MessageCreator {

    private MessageBuilder msgBuilder;
    private EmbedBuilder ebdBuilder;

    public MessageCreator() {
        msgBuilder = new MessageBuilder();
        ebdBuilder = new EmbedBuilder();
    }

    public MessageBuilder getMessageBuilder() {
        return msgBuilder;
    }

    public EmbedBuilder getEmbedBuilder() {
        return ebdBuilder;
    }

    public void createMessage(ArrayList<DBEntry> entry) {
        msgBuilder.clear();

        msgBuilder.append("**");
        entry.forEach(dbe -> msgBuilder.append(dbe.getNameNewline()));
        msgBuilder.append("**");
    }

    public void createMessage(String text) {
        msgBuilder.clear();
        msgBuilder.append(text);
    }

    public void createEmbed(DBEntry entry) {
        ebdBuilder.clear();

        if (entry instanceof Servant) {
            setupServant((Servant) entry);
        } else {
            setupCE((CraftEssence) entry);
        }
    }

    private void setupServant(Servant servant) {
        ebdBuilder.setThumbnail(servant.getImg());
        ebdBuilder.setColor(65535);
        ebdBuilder.setTitle(servant.getEnName());
        ebdBuilder.setDescription(servant.getJpName());
        ebdBuilder.addField("", servant.toString(), false);
    }

    private void setupCE(CraftEssence ce) {
        ebdBuilder.setThumbnail(ce.getImg());
        ebdBuilder.setColor(32768);
        ebdBuilder.setTitle(ce.getEnName());
        ebdBuilder.setDescription(ce.getJpName());
        ebdBuilder.addField("", ce.toString(), false);
    }
}
