package com.github.huebama_ting.segfault_chan;

import net.dv8tion.jda.api.events.message.MessageReceivedEvent;

public class MessageCentre {
    
    private ServantQuery servantQuery;
    private MessageCreator msgCreator;
    private static final short SERV_NUM = 271;
    
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
        Servant result = servantQuery.getServantInfo(message);

        if (result == null) {
            msgCreator.createMessage("Servant not found!");
            event.getChannel().sendMessage(msgCreator.getMessageBuilder().build()).queue();

            return;
        }

        msgCreator.createEmbed(result);
        event.getChannel().sendMessage(msgCreator.getEmbedBuilder().build()).queue();
    }
}
