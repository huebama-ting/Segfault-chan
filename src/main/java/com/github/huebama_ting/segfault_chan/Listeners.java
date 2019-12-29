/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

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
