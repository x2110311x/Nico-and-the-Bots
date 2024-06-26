import { channelIDs, roles } from "configuration/config";
import { CommandError, CommandOptions, CommandRunner } from "configuration/definitions";
import { MessageEmbed, Snowflake, TextChannel } from "discord.js";
import { CommandOptionType } from "slash-create";

export const Options: CommandOptions = {
    description: "Approves or denies a user's application for Firebreathers",
    options: [
        {
            name: "applicationid",
            description: "The application to approve or deny",
            required: true,
            type: CommandOptionType.STRING
        },
        {
            name: "approve",
            description: "Whether or not to approve the application",
            required: true,
            type: CommandOptionType.STRING,
            choices: [
                { name: "Approve", value: "approved" },
                { name: "Deny", value: "denied" }
            ]
        },
        {
            name: "reason",
            description: "A description of why they were approved/denied",
            required: true,
            type: CommandOptionType.STRING
        }
    ]
};

export const Executor: CommandRunner<{ applicationid: Snowflake; approve: "approved" | "denied"; reason: string }> =
    async (ctx) => {
        const { applicationid, approve, reason } = ctx.opts;
        const chan = ctx.member.guild.channels.cache.get(channelIDs.deapplications) as TextChannel;
        const m = (await chan.messages.fetch({ around: applicationid, limit: 1 })).first();
        const userID = m?.embeds[0].footer?.text as Snowflake;

        if (!m || !userID) throw new CommandError("Invalid applicationid");

        const member = await ctx.member.guild.members.fetch(userID);
        if (!member) throw new CommandError("Could not find associated member");

        const role = ctx.member.guild.roles.cache.get(roles.deatheaters);
        if (!role) throw new CommandError("Unable to find FB role");

        const dm = await member.createDM();
        if (!dm) await chan.send(`Unable to DM <@${member.user.id}>. Please inform them manually that they were ${approve}.`); // prettier-ignore
        else {
            const embed = new MessageEmbed()
                .setColor(role.color)
                .setDescription(`You were ${approve} for the Firebreathers role.`)
                .addField("Reason", reason);
            if (approve === "denied")
                embed.addField(
                    "Can I apply again?",
                    "You may apply again at any time, but we generally recommend to wait 2 months."
                );

            await dm.send({embeds: [embed]});
        }

        const applicationEmbed = m.embeds[0];
        applicationEmbed.setFooter(`Application ${approve}`);
        if (approve === "approved") {
            await member.roles.add(role.id);
            applicationEmbed.setColor(role.color);
        }
        await m.edit({ embeds: [applicationEmbed] });

        const embed = new MessageEmbed()
            .setAuthor(member.displayName, member.user.displayAvatarURL())
            .setTitle(`${member.displayName} was ${approve} for Firebreathers`)
            .addField("By", `<@${ctx.user.id}>`)
            .addField("Reason", reason);
        await ctx.send({ embeds: [embed.toJSON()] });
    };
