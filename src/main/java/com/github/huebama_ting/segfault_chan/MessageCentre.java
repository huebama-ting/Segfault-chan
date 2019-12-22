package com.github.huebama_ting.segfault_chan;

import net.dv8tion.jda.api.events.message.MessageReceivedEvent;

import java.util.ArrayList;

public class MessageCentre {
    
    private ServantQuery servantQuery;
    private CraftEssenceQuery ceQuery;
    private MessageCreator msgCreator;
    
    public MessageCentre() {
        servantQuery = new ServantQuery();
        ceQuery = new CraftEssenceQuery();
        msgCreator = new MessageCreator();
    }
    
    public void messageReceivedProcessor(MessageReceivedEvent event) {
        if (event.getAuthor().isBot()) {
            return;
        }

        String[] message = event.getMessage().getContentRaw().split(" ", 2);

        if (message[0].equals("!servant") || message[0].equals("!serv")) {
            servantLookup(event, message[1]);
        } else if (message[0].equals("!craftessence") || message[0].equals("!ce")) {
            ceLookup(event, message[1]);
        }
    }
    
    private void servantLookup(MessageReceivedEvent event, String message) {
        ArrayList<DBEntry> result = servantQuery.getEntryInfo(message);

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

    private void ceLookup(MessageReceivedEvent event, String message) {
        ArrayList<DBEntry> result = ceQuery.getEntryInfo(message);

        if (result.size() == 0) {
            msgCreator.createMessage("Craft Essence not found!");
            event.getChannel().sendMessage(msgCreator.getMessageBuilder().build()).queue();
        } else if (result.size() == 1) {
            msgCreator.createEmbed(result.get(0));
            event.getChannel().sendMessage(msgCreator.getEmbedBuilder().build()).queue();
        } else {
            msgCreator.createMessage("Multiple results found: \n\n" + getMatches(result));
            event.getChannel().sendMessage(msgCreator.getMessageBuilder().build()).queue();
        }
    }

    private String getMatches(ArrayList<DBEntry> result) {
        StringBuilder out = new StringBuilder();
        Servant s;
        CraftEssence ce;

        for (DBEntry d : result) {
            if (d instanceof Servant) {
                s = (Servant) d;
                out.append(s.getEnName()).append("\n");
            } else {
                ce = (CraftEssence) d;
                out.append(ce.getEnName()).append("\n");
            }
        }

        return out.toString();
    }
}
