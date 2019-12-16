package com.github.huebama_ting.segfault_chan;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class ServantQuery {

    private DBConnection conn;

    public ServantQuery() {
        conn = new DBConnection("bot", "*J4#P&o0IZdE", "localhost", "3306", "fgo", "servants");
    }

    public ArrayList<Servant> getServantByID(String idn) {
        ArrayList<Servant> servantList = null;
        String query = "SELECT * FROM " + conn.getTable() + " WHERE id = " + idn;

        try (Statement stmt = conn.getConn().createStatement()) {
            servantList = processIDQuery(stmt, query);
        } catch (SQLException exception) {
            conn.printSQLException(exception);
        }

        return servantList;
    }

    private ArrayList<Servant> processIDQuery(Statement stmt, String query) throws SQLException {
        ResultSet rs =  stmt.executeQuery(query);
        ArrayList<Servant> servantList = new ArrayList<>();

        while (rs.next()) {
            Servant serv = new Servant(rs.getShort("id"), rs.getString("name"), rs.getString("class"),
                                       rs.getInt("hp"), rs.getShort("atk"), rs.getString("traits"),
                                       rs.getString("illust"), rs.getString("cv"), rs.getString("align"),
                                       rs.getString("ht_wt"), rs.getString("gender"), rs.getString("nick"),
                                       rs.getString("attrib"), rs.getString("rarity"), rs.getString("img"));

            servantList.add(serv);
        }

        return servantList;
    }

    public String getServantInfo(String input) {
        return getServantByID(input).get(0).toString();

    }
}
