/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DBConnection {

    private String username;
    private String password;
    private String host;
    private String port;
    private String database;
    private String table;
    private Connection conn;

    public DBConnection(String username, String password, String host, String port, String database, String table) {
        this.username = username;
        this.password = password;
        this.host = host;
        this.port = port;
        this.database = database;
        this.table = table;

        try {
            conn = getConnection();
        } catch (SQLException exception) {
            printSQLException(exception);
        }
    }

    private Connection getConnection() throws SQLException {
        Connection conn;
        Properties connProps = new Properties();

        connProps.put("user", username);
        connProps.put("password", password);

        conn = DriverManager.getConnection("jdbc:mysql://" + host + ":" + port + "/" + database, connProps);

        return conn;
    }

    public void printSQLException(SQLException ex) {
        ex.printStackTrace();

        while (ex != null) {
            Throwable t = ex.getCause();

            System.err.println("SQL State: " + ex.getSQLState());
            System.err.println("Error Code: " + ex.getErrorCode());
            System.err.println("Message: " + ex.getMessage());

            while (t != null) {
                System.out.println("Cause: " + t);
                t = t.getCause();
            }

            ex = ex.getNextException();
        }
    }

    public Connection getConn() {
        return conn;
    }

    public void setTable(String newTable) {
        table = newTable;
    }

    public String getTable() {
        return table;
    }

    public String getDatabase() {
        return database;
    }
}
