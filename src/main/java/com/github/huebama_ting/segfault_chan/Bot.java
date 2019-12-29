/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Activity;

public class Bot {

    public static void main(String[] args) throws Exception {
        // Bot token provided as command line argument
        JDA api = new JDABuilder(args[0]).setActivity(Activity.playing("with oof")).addEventListeners(new Listeners()).build();
    }
}
