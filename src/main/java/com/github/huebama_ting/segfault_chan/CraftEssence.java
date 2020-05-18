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

    /**
     * Constructs a {@code CraftEssence} object containing the specified parameters.
     * @param idn the craft essence's ID number.
     * @param enName the craft essence's English name.
     * @param jpName the craft essence's Japanese name.
     * @param rarity the craft essence's rarity.
     * @param hp the craft essence's maximum HP.
     * @param atk the craft essence's maximum ATK.
     * @param effect the craft essence's effects.
     * @param img the craft essence's image link.
     */
    public CraftEssence(short idn, String enName, String jpName, String rarity, int hp, short atk, String effect,
                        String img) {
        super(idn, enName, jpName, rarity, hp, atk, img);

        this.effect= effect;
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
