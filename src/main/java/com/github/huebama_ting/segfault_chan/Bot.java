package com.github.huebama_ting.segfault_chan;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;

public class Bot {

    public static void main(String[] args) throws Exception {
        // Bot token provided as command line argument
        JDA api = new JDABuilder(args[0]).addEventListeners(new Listeners()).build();
    }
}
