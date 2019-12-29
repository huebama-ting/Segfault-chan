/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

import java.util.ArrayList;

public class FGOGacha extends Gacha {

    private ServantQuery servantQuery;
    private CraftEssenceQuery ceQuery;

    public FGOGacha(ServantQuery servantQuery, CraftEssenceQuery ceQuery) {
        this.servantQuery = servantQuery;
        this.ceQuery = ceQuery;
    }

    @Override
    public DBEntry highTierGachaYolo() {
        byte roll = roll();
        ArrayList<DBEntry> resultList;

        if (roll == 0) {
            resultList = servantQuery.getEntry("5★");
        } else if (roll < 4) {
            resultList = servantQuery.getEntry("4★");
        } else if (roll < 44) {
            resultList = servantQuery.getEntry("3★");
        } else if (roll < 48) {
            resultList = ceQuery.getEntry("5★");
        } else if (roll < 61) {
            resultList = ceQuery.getEntry("4★");
        } else {
            resultList = ceQuery.getEntry("3★");
        }

        return resultList.get((short) (Math.random() * resultList.size()));
    }

    @Override
    public DBEntry lowTierGachaYolo() {
        byte roll = roll();
        ArrayList<DBEntry> resultList;

        if (roll == 0) {
            resultList = servantQuery.getEntry("3★");
        } else if (roll < 4) {
            resultList = servantQuery.getEntry("2★");
        } else if (roll < 44) {
            resultList = servantQuery.getEntry("1★");
        } else if (roll < 48) {
            resultList = ceQuery.getEntry("3★");
        } else if (roll < 61) {
            resultList = ceQuery.getEntry("2★");
        } else {
            resultList = ceQuery.getEntry("1★");
        }

        return resultList.get((short) (Math.random() * resultList.size()));
    }

    @Override
    public ArrayList<DBEntry> highTierGachaMulti() {
        ArrayList<DBEntry> multiResults = new ArrayList<>();

        for (int i = 0; i < 8; i++) {
            multiResults.add(highTierGachaYolo());
        }

        multiResults.add(bonusServantRoll());
        multiResults.add(bonusRoll());

        return multiResults;
    }

    private Servant bonusServantRoll() {
        byte roll = roll();
        ArrayList<DBEntry> resultList;

        if (roll == 0) {
            resultList = servantQuery.getEntry("5★");
        } else if (roll < 20) {
            resultList = servantQuery.getEntry("4★");
        } else {
            resultList = servantQuery.getEntry("3★");
        }

        return (Servant) resultList.get((short) (Math.random() * resultList.size()));
    }

    private DBEntry bonusRoll() {
        byte roll = roll();
        ArrayList<DBEntry> resultList;

        if (roll == 0) {
            resultList = servantQuery.getEntry("5★");
        } else if (roll < 9) {
            resultList = servantQuery.getEntry("4★");
        } else if (roll < 20) {
            resultList = ceQuery.getEntry("5★");
        } else {
            resultList = ceQuery.getEntry("4★");
        }

        return resultList.get((short) (Math.random() * resultList.size()));
    }

    @Override
    public ArrayList<DBEntry> lowTierGachaMulti() {
        ArrayList<DBEntry> multiResults = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            multiResults.add(lowTierGachaYolo());
        }

        return multiResults;
    }
}
