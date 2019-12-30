/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Activity;
import javax.security.auth.login.LoginException;

/**
 * The {@code Bot} class is a wrapper for the instance of the JDA Discord bot.
 */
public class Bot {

    /**
     * Starts up the bot.
     * @param args the command line arguments for the bot. The bot token is provided as the bot token for the bot to
     *             login to discord.
     */
    public static void main(String[] args) {
        try {
            // Bot token provided as command line argument
            JDA bot = new JDABuilder(args[0]).setActivity(Activity.playing("with oof")).addEventListeners(new Listeners()).build();
        } catch (LoginException | IllegalArgumentException ex) {
            System.err.println(ex.getMessage());
            ex.printStackTrace();
        }
    }
}
