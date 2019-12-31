/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.events.message.react.MessageReactionAddEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;

/**
 * The {@code Listeners} class is a wrapper for all event listeners for the bot.
 */
public class Listeners extends ListenerAdapter {

    private MessageCentre msgCtr;

    /**
     * Constructs a {@code Listeners} object for all message events for the bot.
     */
    public Listeners() {
        msgCtr = new MessageCentre();
    }

    /**
     * Wraps the message event to enable processing of it.
     * @param event the event to react to.
     */
    @Override
    public void onMessageReceived(MessageReceivedEvent event) {
        msgCtr.messageReceivedProcessor(event);
    }

    @Override
    public void onMessageReactionAdd(MessageReactionAddEvent event) {
        msgCtr.navigateEmbed(event);
    }
}
