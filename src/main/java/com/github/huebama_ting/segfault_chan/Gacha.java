/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

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
