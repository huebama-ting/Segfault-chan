package com.github.huebama_ting.segfault_chan;

import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;

public class Listeners extends ListenerAdapter {

    private ServantQuery servantQuery;
    private MessageCreator msgCreator;
    private static final short SERV_NUM = 271;

    public Listeners() {
        servantQuery = new ServantQuery();
        msgCreator = new MessageCreator();
    }

    @Override
    public void onMessageReceived(MessageReceivedEvent event) {
        if (event.getAuthor().isBot()) {
            return;
        }

        String[] messageContent = event.getMessage().getContentRaw().split(" ");

        if (messageContent[0].equals("!servant")) {
            if (Short.parseShort(messageContent[1]) > SERV_NUM) {
                msgCreator.createMessage("Servant not found!");
                event.getChannel().sendMessage(msgCreator.getMessageBuilder().build()).queue();

                return;
            }
            msgCreator.createEmbed(servantQuery.getServantInfo(messageContent[1]));
            event.getChannel().sendMessage(msgCreator.getEmbedBuilder().build()).queue();
        }
    }
}
