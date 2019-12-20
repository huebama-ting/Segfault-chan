package com.github.huebama_ting.segfault_chan;

import net.dv8tion.jda.api.events.message.MessageReceivedEvent;

import java.util.ArrayList;

public class MessageCentre {
    
    private ServantQuery servantQuery;
    private MessageCreator msgCreator;
    
    public MessageCentre() {
        servantQuery = new ServantQuery();
        msgCreator = new MessageCreator();
    }
    
    public void messageReceivedProcessor(MessageReceivedEvent event) {
        if (event.getAuthor().isBot()) {
            return;
        }

        String[] message = event.getMessage().getContentRaw().split(" ", 2);

        if (message[0].equals("!servant")) {
            servantLookup(event, message[1]);
        }
    }
    
    private void servantLookup(MessageReceivedEvent event, String message) {
        ArrayList<Servant> result = servantQuery.getServantInfo(message);

        if (result.size() == 0) {
            msgCreator.createMessage("Servant not found!");
            event.getChannel().sendMessage(msgCreator.getMessageBuilder().build()).queue();
        } else if (result.size() == 1) {
            msgCreator.createEmbed(result.get(0));
            event.getChannel().sendMessage(msgCreator.getEmbedBuilder().build()).queue();
        } else {
            msgCreator.createMessage("Multiple results found: \n\n" + getMatches(result));
            event.getChannel().sendMessage(msgCreator.getMessageBuilder().build()).queue();
        }
    }

    private String getMatches(ArrayList<Servant> result) {
        StringBuilder out = new StringBuilder();

        for (Servant s : result) {
            out.append(s.getName()).append("\n");
        }

        return out.toString();
    }
}
