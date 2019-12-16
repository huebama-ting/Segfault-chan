package com.github.huebama_ting.segfault_chan;

import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;

public class Listeners extends ListenerAdapter {

    private ServantQuery servantQuery;

    public Listeners() {
        servantQuery = new ServantQuery();
    }

    @Override
    public void onMessageReceived(MessageReceivedEvent event) {
        if (event.getAuthor().isBot()) {
            return;
        }

        String[] messageContent = event.getMessage().getContentRaw().split(" ");

        if (messageContent[0].equals("!servant")) {
            event.getChannel().sendMessage(servantQuery.getServantInfo(messageContent[1])).queue();
        }
    }
}
