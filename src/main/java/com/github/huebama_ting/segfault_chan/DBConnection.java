/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

/**
 * The {@code DBConnection} class represents a connection to a SQL database. It contains the all the info required to
 * connect to a database, such username and password.
 */
public class DBConnection {

    private String username;
    private String password;
    private String host;
    private String port;
    private String database;
    private String table;
    private Connection conn;

    /**
     * Constructs a {@code DBConnection} object with the specified parameters.
     * @param username the username for the database server.
     * @param password the password for the database server.
     * @param host the hostname of the database server.
     * @param port the port of the database server.
     * @param database the specific database on the database server.
     * @param table the specific table in the database.
     */
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

    /**
     * Attempts to connect to the database using this object's instance variables.
     * @return the established database connection.
     * @throws SQLException if there is an error on database access or invalid credentials are provided for the
     * database.
     */
    private Connection getConnection() throws SQLException {
        Connection conn;
        Properties connProps = new Properties();

        connProps.put("user", username);
        connProps.put("password", password);

        conn = DriverManager.getConnection("jdbc:mysql://" + host + ":" + port + "/" + database, connProps);

        return conn;
    }

    /**
     * Prints out information regarding the {@link java.sql.SQLException} that was thrown to the console.
     * @param ex the exception that was generated.
     */
    public void printSQLException(SQLException ex) {
        ex.printStackTrace();

        while (ex != null) {
            Throwable t = ex.getCause();

            System.err.println("SQL State: " + ex.getSQLState());
            System.err.println("Error Code: " + ex.getErrorCode());
            System.err.println("Message: " + ex.getMessage());

            while (t != null) {
                System.err.println("Cause: " + t);
                t = t.getCause();
            }

            ex = ex.getNextException();
        }
    }

    /**
     * Retrieves this {@code DBConnection}'s {@link java.sql.Connection}.
     * @return the Connection to the database.
     */
    public Connection getConn() {
        return conn;
    }

    /**
     * Retirives the table that this {@code DBConnection} is querying from.
     * @return table to which queries are performed upon.
     */
    public String getTable() {
        return table;
    }
}
