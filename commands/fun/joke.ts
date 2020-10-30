/*!
 * @author Sankarsan Kampa (k3rn31p4nic)
 * @copyright 2020 - The Bastion Bot Project
 */

import { Command, Constants } from "@bastion/tesseract";
import { Message } from "discord.js";

import * as omnic from "../../utils/omnic";

export = class JokeCommand extends Command {
    constructor() {
        super("joke", {
            description: "Posts a random joke collected from the r/jokes subreddit.",
            triggers: [ "jokes" ],
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
        // fetch a random joke
        const response = await omnic.makeRequest("/reddit/jokes/random");
        const [ post ] = await response.json();

        if (!post || !post.data || !post.data.children || !post.data.children.length || !post.data.children[0].data) return;

        // acknowledge
        await message.channel.send({
            embed: {
                color: Constants.COLORS.IRIS,
                title: post.data.children[0].data.title.slice(0, 256),
                url: post.data.children[0].data.url,
                ...(post.data.children[0].data.selftext ? { description: post.data.children[0].data.selftext.slice(0, 1024) } : {}),
                footer: {
                    text: "Powered by r/jokes",
                },
            },
        });
    }
}
