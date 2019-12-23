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
    public DBEntry highTierGacha() {
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

        return resultList.get((byte) (Math.random() * resultList.size()));
    }

    @Override
    public DBEntry lowTierGacha() {
        return null;
    }
}
