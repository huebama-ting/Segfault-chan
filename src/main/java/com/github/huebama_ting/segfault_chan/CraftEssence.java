/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

/**
 * The {@code CraftEssence} class models a Fate/Grand Order craft essence. Each CraftEssence object contains information
 * regarding each craft essence, such as stats and effects.
 */
public class CraftEssence extends DBEntry {

    private String effect;

    public CraftEssence(short idn, String name_en, String name_jp, String rarity, int hp, short atk, String effect,
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

    @Override
    public String toString() {
        return "**ID: **" + idn + "\n**Rarity: **" + rarity + "\n**Max HP: **" + hp + "\n**Max ATK: **" + atk +
                "\n**Effect(s): **\n" + effect;
    }

    @Override
    public String getGachaNewline() {
        return enName + " (" + rarity + " CE)" + "\n";
    }
}
