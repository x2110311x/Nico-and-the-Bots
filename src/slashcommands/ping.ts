import { CommandOptions, CommandRunner } from "configuration/definitions";
import { MessageEmbed } from "discord.js";

interface Ping {
    ping: number;
    time: number;
}

const previousPings: Ping[] = [];

export const Options: CommandOptions = {
    description: "Checks the bot's ping",
    options: []
};

export const Executor: CommandRunner = async (ctx) => {
    const PING_TIME = 1000 * 60 * 5; // 5 MINUTES

    await ctx.send("Pinging...");

    const prior = Date.now();
    const after = ctx.invokedAt;

    const currentPing = Math.abs(after - prior);

    previousPings.push({ ping: currentPing, time: Date.now() });

    let pingSum = 0;
    let pingCount = 0;

    for (let i = previousPings.length - 1; i >= 0; i--) {
        if (previousPings[i].time + PING_TIME >= Date.now()) {
            pingSum += previousPings[i].ping;
            pingCount++;
        } else {
            previousPings.splice(i, 1);
        }
    }

    const average = Math.floor(pingSum / pingCount);

    const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Pinged ${currentPing}ms`)
        .addField("Heartbeat", `${Math.floor(ctx.client.ws.ping)}ms`)
        .addField("Average ping", `${average}ms over ${pingCount} ping${pingCount === 1 ? "" : "s"}`);
    await ctx.editOriginal({ embeds: [embed.toJSON()] });
};
