package com.github.huebama_ting.segfault_chan;

import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;

public class Listeners extends ListenerAdapter {

    private MessageCentre msgCtr;

    public Listeners() {
        msgCtr = new MessageCentre();
    }

    @Override
    public void onMessageReceived(MessageReceivedEvent event) {
        msgCtr.messageReceivedProcessor(event);
    }
}
