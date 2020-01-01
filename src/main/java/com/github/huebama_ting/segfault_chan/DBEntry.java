/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

/**
 * The {@code DBEntry} abstract class encompasses all types of entries possible in the bot database.
 */
public abstract class DBEntry {

    protected short idn;
    protected String enName;
    protected String jpName;
    protected String rarity;
    protected int hp;
    protected short atk;
    protected String img;

    /**
     * Retrieves the English name for this {@code DBEntry} object.
     * @return the English name of this servant.
     */
    public String getEnName() {
        return enName;
    }

    /**
     * Retrieves the Japanese name for this {@code DBEntry} object.
     * @return the Japanese name of this servant.
     */
    public String getJpName() {
        return jpName;
    }

    /**
     * Retrieves the image link for this {@code DBEntry} object.
     * @return the image link of this servant.
     */
    public String getImg() {
        return img;
    }

    /**
     * Retrieves the English name of the entry and its rarity, terminated by a newline ({@code \n}).
     * @return the English name of the entry and its rarity, terminated with a newline.
     */
    public abstract String getGachaNewline();
}
