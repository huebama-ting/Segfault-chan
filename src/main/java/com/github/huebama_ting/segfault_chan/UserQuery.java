/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class UserQuery extends Query {

    public UserQuery() {
        super("fgo", "user");
    }

    @Override
    protected ArrayList<DBEntry> processQuery(Statement stmt, String query) throws SQLException {
        ResultSet rs =  stmt.executeQuery(query);
        ArrayList<DBEntry> userList = new ArrayList<>();

        while (rs.next()) {
            User usr = new User(rs.getLong("uid"), rs.getInt("qp"), rs.getInt("mp"), rs.getInt("rp"), rs.getInt("sq"),
                                rs.getInt("fp"), rs.getInt("uso"));

            userList.add(usr);
        }

        return userList;
    }

    @Override
    protected String defaultSQLQuery(String search) {
        return "SELECT * FROM " + conn.getTable() +  " WHERE uid = " + search;
    }
}
