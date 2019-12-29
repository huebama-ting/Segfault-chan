package com.github.huebama_ting.segfault_chan;

public class Servant extends DBEntry {

    private short idn;
    private String enName;
    private String jpName;
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

    public Servant(short idn, String enName, String jpName, String servClass, int hp, short atk, String traits,
                   String illust, String cv, String align, String htWt, String gender, String nick, String attrib,
                   String rarity, String img) {
        this.idn = idn;
        this.enName = enName;
        this.jpName = jpName;
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

    public short getIdn() {
        return idn;
    }

    public String getEnName() {
        return enName;
    }

    public String getJpName() {
        return jpName;
    }

    public String getServClass() {
        return servClass;
    }

    public int getHp() {
        return hp;
    }

    public short getAtk() {
        return atk;
    }

    public String getTraits() {
        return traits;
    }

    public String getIllust() {
        return illust;
    }

    public String getCv() {
        return cv;
    }

    public String getAlign() {
        return align;
    }

    public String getHtWt() {
        return htWt;
    }

    public String getGender() {
        return gender;
    }

    public String getNick() {
        return nick;
    }

    public String getAttrib() {
        return attrib;
    }

    public String getRarity() {
        return rarity;
    }

    public String getImg() {
        return img;
    }

    @Override
    public String toString() {
        return "**ID: **" + idn + "\n**Class: **" + servClass + "\n**Rarity: **" + rarity + "\n**Max HP: **" + hp +
                "\n**Max ATK: **" + atk + "\n**Traits: **" + traits + "\n**Illustrator: **" + illust +  "\n**CV: **" +
                cv + "\n" + "**Alignment: **" + align + "\n**Height / Weight: **" + htWt + "\n**Gender: **" + gender +
                "\n**Nicknames: **" + nick + "\n**Attribute: **" + attrib;
    }

    @Override
    public String getNameNewline() {
        return enName + " (" + rarity + " Servant)" + "\n";
    }
}
