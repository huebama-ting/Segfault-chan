/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;


/**
 * {@code Query} is the base abstract class for all database queries happen.
 */
public abstract class Query {

    private DBConnection conn;

    /**
     * Constructs a {@code Query} object to serve as the database connection to the specified database and table to
     * allow for queries.
     * @param db the database to connect to.
     * @param table the table from the database to query from.
     */
    public Query(String db, String table) {
        conn = new DBConnection("bot", "*J4#P&o0IZdE", "localhost", "3306", db, table);
    }

    /**
     * Gets all matches within the database that match the passed in query.
     * @param search the search query. Either a name or an ID.
     * @return an {@link java.util.ArrayList} of {@link com.github.huebama_ting.segfault_chan.DBEntry} matching the
     * query.
     */
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

    /**
     * Returns the {@code DBConnection} for this {@code Query}.
     * @return the DBConnection for this instance.
     */
    public DBConnection getConn() {
        return conn;
    }

    /**
     * Processes the passed in query and queries the database to return results.
     * @param stmt the SQL statement being prepared to be executed.
     * @param query the String representing the SQL query.
     * @return an {@link java.util.ArrayList} of {@link com.github.huebama_ting.segfault_chan.DBEntry} matching the
     * query.
     * @throws SQLException if there is an error on database access or no connection has been opened.
     */
    protected abstract ArrayList<DBEntry> processQuery(Statement stmt, String query) throws SQLException;

    /**
     * Determines whether to use the SQL statement for an ID lookup or a name lookup.
     * @param search the search query. Either a name or an ID.
     * @return a {@link java.lang.String} containing the SQL query.
     */
    protected String determineQueryType(String search) {
        if (search.matches("^[0-9]*")) {
            return "SELECT * FROM " + conn.getTable() + " WHERE id = " + search;
        } else if (search.contains("★")) {
            return "SELECT * FROM " + conn.getTable() + " WHERE rarity LIKE '%" + search.charAt(0) + "%'";
        }

        return defaultSQLQuery(search);
    }

    /**
     * Returns a SQL statement to use as a default query.
     * @param search the search query. Either a name or an ID.
     * @return a {@link java.lang.String} containing the SQL query.
     */
    protected abstract String defaultSQLQuery(String search);
}
