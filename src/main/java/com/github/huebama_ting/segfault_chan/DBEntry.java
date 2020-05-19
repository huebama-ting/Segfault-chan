/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

/**
 * The {@code DBEntry} abstract class encompasses all types of entries possible in the bot database.
 */
public abstract class DBEntry {
    /**
     * Retrieves the info of the entry, terminated by a newline ({@code \n}).
     * @return  the info of the entry.
     */
    public abstract String getInfoNewline();
}
