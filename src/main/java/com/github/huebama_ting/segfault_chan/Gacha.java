package com.github.huebama_ting.segfault_chan;

import java.util.ArrayList;

public abstract class Gacha {

    protected byte roll() {
        return (byte) (Math.random() * 100);
    }

    public abstract DBEntry lowTierGachaYolo();

    public abstract DBEntry highTierGachaYolo();

    public abstract ArrayList<DBEntry> lowTierGachaMulti();

    public abstract ArrayList<DBEntry> highTierGachaMulti();
}
