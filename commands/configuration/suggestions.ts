/*!
 * @author Sankarsan Kampa (k3rn31p4nic)
 * @copyright 2020 - The Bastion Bot Project
 */

import { Command, CommandArguments, Constants } from "tesseract";
import { Message } from "discord.js";

import BastionGuild = require("../../structures/Guild");


export = class Suggestions extends Command {
    constructor() {
        super("suggestions", {
            description: "It allows you to enable (and disable) suggestions in the server. It sets the channel as a Report Channel that will receive the user reports, reported by the server members using the `report` command.",
            triggers: [],
            arguments: {
                alias: {
                    disable: [ "d" ],
                },
                boolean: [ "disable" ],
            },
            scope: "guild",
            owner: false,
            typing: true,
            cooldown: 0,
            ratelimit: 1,
            clientPermissions: [],
            userPermissions: [ "MANAGE_GUILD" ],
            syntax: [
                "suggestions",
                "suggestions --disable",
            ],
        });
    }

    exec = async (message: Message, argv: CommandArguments): Promise<void> => {
        const guild = (message.guild as BastionGuild);

        // update the report channel
        if (argv.disable && guild.document.reportsChannelId) {
            guild.document.reportsChannelId = undefined;
            delete guild.document.reportsChannelId;
        } else {
            guild.document.reportsChannelId = message.channel.id;
        }

        // save document
        await guild.document.save();

        // acknowledge
        await message.channel.send({
            embed: {
                color: guild.document.reportsChannelId ? Constants.COLORS.GREEN : Constants.COLORS.RED,
                description: this.client.locale.getString("en_us", "info", guild.document.reportsChannelId ? "reportsEnable" : "reportsDisable", message.author.tag),
            },
        }).catch(() => {
            // This error can be ignored.
        });
    }
}
