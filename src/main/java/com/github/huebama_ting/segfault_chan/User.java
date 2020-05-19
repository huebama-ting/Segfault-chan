/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

public class User extends DBEntry {

    private long uid;
    private int qp;
    private int mp;
    private int rp;
    private int sq;
    private int fp;
    private int uso;

    public User(long uid, int qp, int mp, int rp, int sq, int fp, int uso) {
        this.uid = uid;
        this.qp = qp;
        this.mp = mp;
        this.rp = rp;
        this.sq = sq;
        this.fp = fp;
        this.uso = uso;
    }

    @Override
    public String toString() {
        return "**QP: **" + qp + "\n**Mana Prisms: **" + mp + "\n**Rare Prisms: **" + rp + "\n**Saint Quartz: **" + sq +
                "\n**Friend Points: **" + fp + "\n**Unregistered Spirit Origins: **" + uso;
    }

    @Override
    public String getInfoNewline() {
        return "**QP: **" + qp + " **Mana Prisms: **" + mp + " **Rare Prisms: **" + rp + " **Saint Quartz: **" + sq +
                " **Friend Points: **" + fp + " **Unregistered Spirit Origins: **" + uso;
    }
}
