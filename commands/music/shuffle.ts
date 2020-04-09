/*!
 * @author Sankarsan Kampa (k3rn31p4nic)
 * @copyright 2020 - The Bastion Bot Project
 */

import { Command, Constants } from "tesseract";
import { Message } from "discord.js";

import * as arrays from "../../utils/arrays";
import * as constants from "../../utils/constants";

import BastionGuild = require("../../structures/Guild");
import BastionGuildMember = require("../../structures/GuildMember");


export = class Shuffle extends Command {
    constructor() {
        super("shuffle", {
            description: "",
            triggers: [],
            arguments: {},
            scope: "guild",
            owner: false,
            typing: true,
            cooldown: 0,
            ratelimit: 1,
            clientPermissions: [],
            userPermissions: [],
        });
    }

    exec = async (message: Message): Promise<unknown> => {
        const guild = (message.guild as BastionGuild);

        // Check whether music is enabled in the guild
        if (!guild.document.music || !guild.document.music.enabled) {
            return await message.channel.send({
                embed: {
                    color: Constants.COLORS.RED,
                    description: this.client.locale.getString("en_us", "errors", constants.isPublicBastion(message.author) ? "musicDisabledPublic" : "musicDisabled"),
                },
            }).catch(() => {
                // This error can be ignored.
            });
        }

        // Check whether the command user is a Music Master
        if (!(message.member as BastionGuildMember).isMusicMaster()) return;


        if (guild.music.playing && guild.voice && guild.voice.connection.dispatcher) {
            const nowPlaying = guild.music.queue[0];
            const shuffledQueue = arrays.shuffle(guild.music.queue.slice(1)) as typeof guild.music.queue;

            guild.music.queue = [ nowPlaying, ...shuffledQueue ];

            // Acknowledge
            guild.music.textChannel.send({
                embed: {
                    color: Constants.COLORS.PINK,
                    description: this.client.locale.getString("en_us", "info", "musicQueueShuffle", message.author.tag),
                },
            }).catch(() => {
                // This error can be ignored.
            });
        }
    }
}
