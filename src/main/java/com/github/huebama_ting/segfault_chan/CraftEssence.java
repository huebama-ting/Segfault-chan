/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

public class CraftEssence extends DBEntry {

    private short idn;
    private String enName;
    private String jpName;
    private String rarity;
    private short hp;
    private short atk;
    private String effect;
    private String img;

    public CraftEssence(short idn, String name_en, String name_jp, String rarity, short hp, short atk, String effect,
                        String img) {
        this.idn = idn;
        this.enName = name_en;
        this.jpName = name_jp;
        this.rarity = rarity;
        this.hp = hp;
        this.atk = atk;
        this.effect = effect;
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

    public String getRarity() {
        return rarity;
    }

    public short getHp() {
        return hp;
    }

    public short getAtk() {
        return atk;
    }

    public String getEffect() {
        return effect;
    }

    public String getImg() {
        return img;
    }

    @Override
    public String toString() {
        return "**ID: **" + idn + "\n**Rarity: **" + rarity + "\n**Max HP: **" + hp + "\n**Max ATK: **" + atk +
                "\n**Effect(s): **\n" + effect;
    }

    @Override
    public String getNameNewline() {
        return enName + " (" + rarity + " CE)" + "\n";
    }
}
