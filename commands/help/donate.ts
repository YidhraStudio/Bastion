/*!
 * @author Sankarsan Kampa (k3rn31p4nic)
 * @copyright 2020 - The Bastion Bot Project
 */

import { Command, Constants } from "tesseract";
import { Message } from "discord.js";

export = class DonateCommand extends Command {
    constructor() {
        super("donate", {
            description: "",
            triggers: [],
            arguments: {},
            scope: "guild",
            owner: false,
            cooldown: 0,
            ratelimit: 1,
            clientPermissions: [],
            userPermissions: [],
            syntax: [],
        });
    }

    exec = async (message: Message): Promise<void> => {
        await message.channel.send({
            embed: {
                color: Constants.COLORS.GREEN,
                author: {
                    name: this.client.locale.getConstant("bastion.name"),
                    url: this.client.locale.getConstant("bastion.website"),
                },
                title: "Donate",
                url: this.client.locale.getConstant("bastion.website") + "/donate",
                description: "**Donate and get cool rewards!** Support the development of Bastion to help keep it running, and enjoy an enhanced Bastion exprience.",
                fields: [
                    {
                        name: "Show your appreciation",
                        value: "[Donate to " + this.client.locale.getConstant("bastion.project") + "](" + this.client.locale.getConstant("bastion.website") + "/donate)",
                        inline: true,
                    },
                ],
                footer: {
                    text: this.client.locale.getString("en_us", "info", "didYouKnowDonation"),
                },
            },
        }).catch(() => {
            // this error can be ignored
        });
    }
}
