/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

import java.util.ArrayList;

/**
 * {@code Gacha} is the abstract class that encompasses all possible gacha systems.
 */
public abstract class Gacha {

    /**
     * Generates a random number.
     * @return a random number between 0 and 99.
     */
    protected byte roll() {
        return (byte) (Math.random() * 100);
    }

    /**
     * Rolls the low level gacha once.
     * @return the DBEntry that was rolled.
     */
    public abstract DBEntry lowTierGachaYolo();

    /**
     * Rolls the high level gacha once.
     * @return the DBEntry that was rolled.
     */
    public abstract DBEntry highTierGachaYolo();

    /**
     * Rolls the low level gacha ten times.
     * @return an ArrayList of each DBEntry that was rolled.
     */
    public abstract ArrayList<DBEntry> lowTierGachaMulti();

    /**
     * Rolls the high level gacha ten times.
     * @return an ArrayList of each DBEntry that was rolled.
     */
    public abstract ArrayList<DBEntry> highTierGachaMulti();
}
