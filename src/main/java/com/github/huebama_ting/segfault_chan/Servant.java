/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package com.github.huebama_ting.segfault_chan;

/**
 * The {@code Servant} class models a Fate/Grand Order servant. Each Servant object contains information regarding each
 * servant, such as stats and lore snippets.
 */
public class Servant extends DBEntry {

    private String servClass;
    private String traits;
    private String illust;
    private String cv;
    private String align;
    private String htWt;
    private String gender;
    private String nick;
    private String attrib;

    /**
     * Constructs a {@code Servant} object containing the specified parameters.
     * @param idn the servant's ID number.
     * @param enName the servant's English name.
     * @param jpName the servant's Japanese name.
     * @param servClass the servant's class.
     * @param hp the servant's maximum HP.
     * @param atk the servant's maximum ATK.
     * @param traits the servant's traits.
     * @param illust the servant's illustrator.
     * @param cv the servant's voice actor.
     * @param align the servant's alignment.
     * @param htWt the servant's height and weight.
     * @param gender the servant's gender.
     * @param nick the servant's nicknames.
     * @param attrib the servant's attribute.
     * @param rarity the servant's rarity in game.
     * @param img a link to an image of the servant.
     */
    public Servant(short idn, String enName, String jpName, String servClass, int hp, short atk, String traits,
                   String illust, String cv, String align, String htWt, String gender, String nick, String attrib,
                   String rarity, String img) {
        super(idn, enName, jpName, rarity, hp, atk, img);
        this.servClass = servClass;
        this.traits = traits;
        this.illust = illust;
        this.cv = cv;
        this.align = align;
        this.htWt = htWt;
        this.gender = gender;
        this.nick = nick;
        this.attrib = attrib;
    }

    @Override
    public String toString() {
        return "**ID: **" + idn + "\n**Class: **" + servClass + "\n**Rarity: **" + rarity + "\n**Max HP: **" + hp +
                "\n**Max ATK: **" + atk + "\n**Traits: **" + traits + "\n**Illustrator: **" + illust +  "\n**CV: **" +
                cv + "\n" + "**Alignment: **" + align + "\n**Height / Weight: **" + htWt + "\n**Gender: **" + gender +
                "\n**Nicknames: **" + nick + "\n**Attribute: **" + attrib;
    }

    @Override
    public String getGachaNewline() {
        return enName + " (" + rarity + " Servant)" + "\n";
    }
}
