import { CommandError } from "../../../Configuration/definitions";
import { Embed, ApplicationCommandOptionType } from "discord.js/packages/discord.js";
import ordinal from "ordinal";
import { queries } from "../../../Helpers/prisma-init";
import { SlashCommand } from "../../../Structures/EntrypointSlashCommand";

const command = new SlashCommand(<const>{
    description: "Displays some information about a user",
    options: [
        {
            name: "user",
            description: "The user to get info for",
            required: false,
            type: ApplicationCommandOptionType.User
        }
    ]
});

command.setHandler(async (ctx) => {
    const userID = ctx.opts.user || ctx.user.id;
    if (!ctx.channel?.isText()) return;
    const member = await ctx.channel.guild.members.fetch(userID);
    if (!member) throw new CommandError("Unable to find member");
    // Fetch some info
    const dbUser = await queries.findOrCreateUser(userID, { golds: true, dailyBox: true });
    const golds = dbUser.golds.length;

    const joinedNum = 444; //await economy.getJoinedNum();
    const embed = new Embed()
        .setTitle(member.displayName)
        .setThumbnail(member.user.displayAvatarURL())
        .addField({ name: "Account created on", value: `${member.user.createdAt}` })
        .addField({ name: "Originally joined on", value: `${dbUser.joinedAt}` })
        .addField({ name: "Last joined on", value: `${member.joinedAt || new Date()}` })
        .addField({ name: "Golds", value: `${golds}`, inline: true })
        .addField({ name: "Daily count", value: `${dbUser.dailyBox?.dailyCount || 0}` })
        .setFooter({
            text: `${ordinal(joinedNum)} member | Use the /submit joindate command if your join date is incorrect`
        });
    await ctx.send({ embeds: [embed.toJSON()] });
});

export default command;
