package com.github.huebama_ting.segfault_chan;

public abstract class DBMaterialEntry extends DBEntry {

    protected short idn;
    protected String enName;
    protected String jpName;
    protected String rarity;
    protected int hp;
    protected short atk;
    protected String img;

    public DBMaterialEntry(short idn, String enName, String jpName, String rarity, int hp, short atk, String img) {
        this.idn = idn;
        this.enName = enName;
        this.jpName = jpName;
        this.rarity = rarity;
        this.hp = hp;
        this.atk = atk;
        this.img = img;
    }

    /**
     * Retrieves the English name for this {@code DBEntry} object.
     * @return the English name of this servant.
     */
    public String getEnName() {
        return enName;
    }

    /**
     * Retrieves the Japanese name for this {@code DBEntry} object.
     * @return the Japanese name of this servant.
     */
    public String getJpName() {
        return jpName;
    }

    /**
     * Retrieves the image link for this {@code DBEntry} object.
     * @return the image link of this servant.
     */
    public String getImg() {
        return img;
    }
}
