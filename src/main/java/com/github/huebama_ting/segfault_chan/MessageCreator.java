package com.github.huebama_ting.segfault_chan;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.MessageBuilder;

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

    public void createMessage(DBEntry entry) {
        msgBuilder.clear();
        msgBuilder.append(entry);
    }

    public void createMessage(String text) {
        msgBuilder.clear();
        msgBuilder.append(text);
    }

    public void createEmbed(DBEntry entry) {
        ebdBuilder.clear();

        if (entry instanceof Servant) {
            setupServant((Servant) entry);
        }
    }

    private void setupServant(Servant servant) {
        ebdBuilder.setThumbnail(servant.getImg());
        ebdBuilder.setColor(65535);
        ebdBuilder.setTitle(servant.getName());
        ebdBuilder.setDescription("Fate/Grand Order");
        ebdBuilder.addField("", servant.toString(), false);
    }
}
