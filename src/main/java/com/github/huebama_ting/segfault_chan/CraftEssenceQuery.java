/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class CraftEssenceQuery extends Query {

    private DBConnection conn;

    public CraftEssenceQuery() {
        super("fgo", "ce");
        conn = getConn();
    }

    @Override
    protected ArrayList<DBEntry> processQuery(Statement stmt, String query) throws SQLException {
        ResultSet rs =  stmt.executeQuery(query);
        ArrayList<DBEntry> ceList = new ArrayList<>();

        while (rs.next()) {
            CraftEssence ce = new CraftEssence(rs.getShort("id"), rs.getString("name_en"), rs.getString("name_jp"),
                                                 rs.getString("rarity"), rs.getInt("hp"), rs.getShort("atk"),
                                                 rs.getString("effect"), rs.getString("img"));

            ceList.add(ce);
        }

        return ceList;
    }

    @Override
    protected String defaultSQLQuery(String search) {
        return "SELECT * FROM " + conn.getTable() +  " WHERE name_en = '" + search + "' OR name_en LIKE '%" + search +
                "%' OR name_jp = '" + search + "' OR name_jp LIKE '%" + search + "%'";
    }
}
