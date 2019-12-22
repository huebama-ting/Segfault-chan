package com.github.huebama_ting.segfault_chan;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class ServantQuery extends Query {

    private DBConnection conn;

    public ServantQuery() {
        super("fgo", "servants");
        conn = getConn();
    }

    @Override
    protected ArrayList<DBEntry> processQuery(Statement stmt, String query) throws SQLException {
        ResultSet rs =  stmt.executeQuery(query);
        ArrayList<DBEntry> servantList = new ArrayList<>();

        while (rs.next()) {
            Servant serv = new Servant(rs.getShort("id"), rs.getString("name_en"), rs.getString("name_jp"),
                                       rs.getString("class"), rs.getInt("hp"), rs.getShort("atk"),
                                       rs.getString("traits"), rs.getString("illust"), rs.getString("cv"),
                                       rs.getString("align"), rs.getString("ht_wt"), rs.getString("gender"),
                                       rs.getString("nick"), rs.getString("attrib"), rs.getString("rarity"),
                                       rs.getString("img"));

            servantList.add(serv);
        }

        return servantList;
    }

    @Override
    protected String determineQueryType(String search) {
        if (search.matches("^[0-9]*")) {
            return "SELECT * FROM " + conn.getTable() + " WHERE id = " + search;
        }

        return "SELECT * FROM " + conn.getTable() +  " WHERE name_en = '" + search + "' OR name_en LIKE '%" + search +
                "%' OR name_jp = '" + search + "' OR name_jp LIKE '%" + search + "%' OR nick " + "LIKE '%" + search +
                "%'";
    }
}
