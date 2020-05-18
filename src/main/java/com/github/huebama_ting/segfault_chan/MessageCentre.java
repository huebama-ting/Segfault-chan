/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.events.message.react.MessageReactionAddEvent;
import java.util.ArrayList;

/**
 * The {@code MessageCentre} class handles all message sending events for the bot.
 */
public class MessageCentre {
    
    private ServantQuery servantQuery;
    private CraftEssenceQuery ceQuery;
    private FGOGacha fgoGacha;
    private MessageCreator msgCreator;
    private ArrayList<DBEntry> lastSelected;
    private int selectedIndex;
    private long msgId;
    private static final String SCROLL_BACK_REACT = "U+1f448";
    private static final String SCROLL_AHEAD_REACT = "U+1f449";

    /**
     * Constructs a {@code MessageCentre} object.
     */
    public MessageCentre() {
        servantQuery = new ServantQuery();
        ceQuery = new CraftEssenceQuery();
        fgoGacha = new FGOGacha(servantQuery, ceQuery);
        msgCreator = new MessageCreator();
        lastSelected = null;
        selectedIndex = 0;
        msgId = 0;
    }

    /**
     * Wraps the received event to send an appropriate reaction.
     * @param event the event to react to.
     */
    public void messageReceivedProcessor(MessageReceivedEvent event) {
        if (event.getAuthor().isBot()) {
            return;
        }

        String[] message = event.getMessage().getContentRaw().split(" ", 2);

        if (message[0].equals("!servant") || message[0].equals("!serv")) {
            servantLookup(event, message[1]);
        } else if (message[0].equals("!craftessence") || message[0].equals("!ce")) {
            ceLookup(event, message[1]);
        } else if (message[0].equals("!yolo")) {
            yoloRoll(event, message);
        } else if (message[0].equals("!multi")) {
            multiRoll(event, message);
        } else if (message[0].equals("!collection")) {
            collection(event);
        }
    }

    /**
     * Sends a message containing the result of a yolo roll of the gacha.
     * @param event the event to react to.
     * @param message the command from the event.
     */
    private void yoloRoll(MessageReceivedEvent event, String[] message) {
        if (message.length == 2) {
            DBEntry result = message[1].equals("sq") ? fgoGacha.highTierGachaYolo() : fgoGacha.lowTierGachaYolo();

            msgCreator.createEmbed(result);
            event.getChannel().sendMessage(msgCreator.getEmbedBuilder().build()).queue(msg -> event.getChannel().sendMessage("Use `!collection` to see your collection!").queue());
        } else {
            msgCreator.createMessage("Attach \"sq\" or \"fp\" for your gacha choice!");
            event.getChannel().sendMessage(msgCreator.getMessageBuilder().build()).queue();
        }
    }

    /**
     * Sends a message containing the result of a multi roll of the gacha.
     * @param event the event to react to.
     * @param message the command from the event.
     */
    private void multiRoll(MessageReceivedEvent event, String[] message) {
        selectedIndex = 0;

        if (message.length == 2) {
            lastSelected = message[1].equals("sq") ? fgoGacha.highTierGachaMulti() : fgoGacha.lowTierGachaMulti();
            msgCreator.createEmbed(lastSelected, selectedIndex);
            event.getChannel().sendMessage(event.getMember().getAsMention() + ", you rolled:\n").queue(sent -> event.getChannel().sendMessage(msgCreator.getEmbedBuilder().build()).queue(msg -> {
                event.getChannel().sendMessage("Use `!collection` to see your collection!").queue();
                msg.addReaction(SCROLL_BACK_REACT).queue();
                msg.addReaction(SCROLL_AHEAD_REACT).queue();
                msgId = msg.getIdLong();
            }));
        } else { // Invalid argument form
            msgCreator.createMessage("Attach \"sq\" or \"fp\" for your gacha choice!");
            event.getChannel().sendMessage(msgCreator.getMessageBuilder().build()).queue();
        }
    }

    /**
     * Sends a message containing the result of a servant lookup.
     * @param event the event to react to.
     * @param message the command from the event.
     */
    private void servantLookup(MessageReceivedEvent event, String message) {
        lastSelected = servantQuery.getEntry(message);

        if (lastSelected.size() == 0) { // No matches
            msgCreator.createMessage("Servant not found!");
            event.getChannel().sendMessage(msgCreator.getMessageBuilder().build()).queue();
        } else { // One or multiple matches
            sendEmbed(event);
        }
    }

    /**
     * Sends a message containing the result of a craft essence lookup.
     * @param event the event to react to.
     * @param message the command from the event.
     */
    private void ceLookup(MessageReceivedEvent event, String message) {
        lastSelected = ceQuery.getEntry(message);

        if (lastSelected.size() == 0) { // No matches
            msgCreator.createMessage("Craft Essence not found!");
            event.getChannel().sendMessage(msgCreator.getMessageBuilder().build()).queue();
        } else { // One or multiple matches
            sendEmbed(event);
        }
    }

    private void sendEmbed(MessageReceivedEvent event) {
        selectedIndex = 0;

        if (lastSelected.size() == 1) { // One match
            msgCreator.createEmbed(lastSelected.get(0));
            event.getChannel().sendMessage(msgCreator.getEmbedBuilder().build()).queue();
        } else { // Multiple matches
            msgCreator.createMessage("Multiple results found:");
            msgCreator.createEmbed(lastSelected, selectedIndex);
            event.getChannel().sendMessage(msgCreator.getMessageBuilder().build()).queue(sent -> event.getChannel().sendMessage(msgCreator.getEmbedBuilder().build()).queue(msg -> {
                msg.addReaction(SCROLL_BACK_REACT).queue();
                msg.addReaction(SCROLL_AHEAD_REACT).queue();
                msgId = msg.getIdLong();
            }));
        }
    }

    /**
     * Retrieves a list of multiple matching results.
     * @param result the ArrayList containing multiple matches
     * @return a String containing the names of all the entries that were found.
     */
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

    public void navigateEmbed(MessageReactionAddEvent event) {
        // Do not attempt to edit messages that do not belong to bot or were sent by other bots or itself
        if (event.getMessageIdLong() != msgId || event.getUser().isBot()) {
            return;
        }

        // Check if the reaction was to scroll ahead or behind
        if (event.getReactionEmote().getAsCodepoints().equals(SCROLL_AHEAD_REACT)) {
            selectedIndex++;
        } else {
            selectedIndex--;
        }

        // Reset bounds to rollover to either first item or last item
        selectedIndex = selectedIndex < 0 ? lastSelected.size() - 1 : selectedIndex;
        selectedIndex = selectedIndex > lastSelected.size() - 1 ? 0 : selectedIndex;
        msgCreator.createEmbed(lastSelected, selectedIndex);
        event.getChannel().editMessageById(msgId, msgCreator.getEmbedBuilder().build()).queue();
    }

    private void collection(MessageReceivedEvent event) {
        event.getChannel().sendMessage("Under construction, stay tuned kek").queue();
    }
}
