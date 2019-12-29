/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public abstract class Query {

    private DBConnection conn;

    public Query(String db, String table) {
        conn = new DBConnection("bot", "*J4#P&o0IZdE", "localhost", "3306", db, table);
    }

    public ArrayList<DBEntry> getEntry(String search) {
        ArrayList<DBEntry> resultList = null;
        String query = determineQueryType(search);

        try (Statement stmt = conn.getConn().createStatement()) {
            resultList = processQuery(stmt, query);
        } catch (SQLException exception) {
            conn.printSQLException(exception);
        }

        return resultList;
    }

    public ArrayList<DBEntry> getEntryInfo(String input) {
        return getEntry(input);
    }

    public DBConnection getConn() {
        return conn;
    }

    protected abstract ArrayList<DBEntry> processQuery(Statement stmt, String query) throws SQLException;

    protected String determineQueryType(String search) {
        if (search.matches("^[0-9]*")) {
            return "SELECT * FROM " + conn.getTable() + " WHERE id = " + search;
        } else if (search.contains("★")) {
            return "SELECT * FROM " + conn.getTable() + " WHERE rarity LIKE '%" + search.charAt(0) + "%'";
        }

        return defaultSQLQuery(search);
    }

    protected abstract String defaultSQLQuery(String search);
}
