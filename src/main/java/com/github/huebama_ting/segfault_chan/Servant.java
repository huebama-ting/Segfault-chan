package com.github.huebama_ting.segfault_chan;

public class Servant {

    private short idn;
    private String name;
    private String servClass;
    private int hp;
    private short atk;
    private String traits;
    private String illust;
    private String cv;
    private String align;
    private String htWt;
    private String gender;
    private String nick;
    private String attrib;
    private String rarity;
    private String img;

    public Servant(short idn, String name, String servClass, int hp, short atk, String traits, String illust,
                   String cv, String align, String htWt, String gender, String nick, String attrib, String rarity,
                   String img) {
        this.idn = idn;
        this.name = name;
        this.servClass = servClass;
        this.hp = hp;
        this.atk = atk;
        this.traits = traits;
        this.illust = illust;
        this.cv = cv;
        this.align = align;
        this.htWt = htWt;
        this.gender = gender;
        this.nick = nick;
        this.attrib = attrib;
        this.rarity = rarity;
        this.img = img;
    }

    @Override
    public String toString() {
        return "**ID: **" + idn + "\n**Name: **" + name;
    }

    /*public String[] getServantInfo() {
        return new String[] {Short.toString(idn), name, servClass, Integer.toString(hp), Short.toString(atk), traits,
                illust, cv, align, htWt, gender, nick, attrib, rarity, img};
    }*/
}
