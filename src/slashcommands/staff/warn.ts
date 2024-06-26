import { CommandError, CommandOptions, CommandRunner, WarningData } from "configuration/definitions";
import { Item } from "database/entities/Item";
import { GuildMember, MessageEmbed, Snowflake } from "discord.js";
import { MessageTools } from "helpers";
import { CommandOptionType } from "slash-create";
import * as jail from "./jail";

const rules = <const>["Bothering Others", "Drama", "Spam", "NSFW/Slurs", "Other"];

export const Options: CommandOptions = {
    description: "Submits a warning for a user",
    options: [
        { name: "user", description: "The user to warn", required: true, type: CommandOptionType.USER },
        {
            name: "rule",
            description: "The rule broken. Must be one of {B, D, S, N, O} (you can write it out too)",
            required: true,
            type: CommandOptionType.STRING,
            choices: rules.map((name) => ({ name, value: name }))
        },
        {
            name: "severity",
            description: "The severity of the warning. Must be between 1 and 10 (inclusive)",
            required: true,
            type: CommandOptionType.INTEGER
        },
        {
            name: "explanation",
            description:
                "A description of why you are warning the user, and how they can avoid another warning in the future.",
            required: true,
            type: CommandOptionType.STRING
        }
    ]
};

export const Executor: CommandRunner<{
    user: Snowflake;
    rule: typeof rules[number];
    severity: number;
    explanation: string;
}> = async (ctx) => {
    const { user, rule, severity, explanation } = ctx.opts;

    const ruleBroken = rules.find((r) => r === rule);

    if (!ruleBroken) throw new CommandError(`Invalid rule given. Please choose one of:\n- ${rules.join("\n- ")}`);
    if (severity < 1 || severity > 10) throw new CommandError("Invalid severity. Must be between 1 and 10.");

    const confirmationEmbed = new MessageEmbed();
    confirmationEmbed.setTitle("Would you like to submit this warning?");
    confirmationEmbed.addField("User", `<@${user}>`);
    confirmationEmbed.addField("Explanation", explanation);
    confirmationEmbed.addField("Rule Broken", ruleBroken);
    confirmationEmbed.addField("Severity", `${severity}`);

    await ctx.acknowledge();
    const con_m = await ctx.channel.send({ embeds: [confirmationEmbed] });

    const confirmation_msg = await MessageTools.awaitMessage(ctx.user.id, ctx.channel, 120000);
    if (!confirmation_msg) throw new CommandError("I didn't hear back from you in time");

    await new Promise((next) => setTimeout(next, 300));
    await confirmation_msg.delete();
    await con_m.delete();

    if (confirmation_msg.content.toLowerCase().indexOf("yes") !== -1) {
        confirmationEmbed.setTitle("Warning submitted.");
        await ctx.channel.send({ embeds: [confirmationEmbed] });

        const member = await ctx.channel.guild.members.fetch(user);

        //DM WARNED USER
        try {
            const dm = await member.createDM();
            confirmationEmbed.setTitle("You have received a warning");
            confirmationEmbed.setAuthor(member.displayName, member.user.displayAvatarURL());
            confirmationEmbed.setFooter(
                `Initiated by ${ctx.member.displayName} || Please refrain from committing these infractions again. Any questions can be directed to the staff!`,
                ctx.user.avatarURL
            );
            await dm.send({ embeds: [confirmationEmbed] });
        } catch (e) {
            await ctx.channel.send(
                "> Unable to DM user about their warning, you may want to message them so they are aware"
            );
        }

        //INSERT WARNING TO DATABASE
        const warnData: WarningData = {
            edited: false,
            given: ctx.user.id,
            channel: ctx.channel.id,
            rule: ruleBroken,
            severity,
            content: explanation
        };
        const warn = new Item({
            identifier: member.id,
            title: JSON.stringify(warnData),
            type: "Warning",
            time: Date.now()
        });
        await ctx.connection.manager.save(warn);
        autoJailCheck(member);
    } else throw new CommandError("Warning cancelled. Use !warn to start again.");

    async function autoJailCheck(member: GuildMember) {
        const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;
        const recentWarns = await ctx.connection.getMongoRepository(Item).count({
            id: member.id,
            type: "Warning",
            time: { $gt: Date.now() - ONE_YEAR }
        });
        if (recentWarns >= 3) autoJail(member);
        else {
            const embed = new MessageEmbed();
            embed.setColor("#FF0000");
            embed.setDescription(
                `${Math.max(0, 3 - recentWarns)} more warning${
                    recentWarns === 1 ? "" : "s"
                } until this user is auto-jailed.`
            );
            await ctx.channel.send({ embeds: [embed] });
        }
    }

    async function autoJail(member: GuildMember) {
        // TODO: Fix
        // Hooks into !jail to jail user
        ctx.runCommand(jail.Executor, {
            user: member.user.id,
            explanation: "[Autojail] You were automatically jailed for receiving multiple warnings."
        });
    }
};
