import { roles } from "configuration/config";
import { CommandError, CommandOptions, CommandRunner } from "configuration/definitions";
import { MessageEmbed, Snowflake } from "discord.js";
import { CommandOptionType } from "slash-create";

const { SAI, TRENCH, BF, VSL, RAB, ST } = roles.albums;
const albumRoles = {
    "Scaled and Icy": SAI,
    Trench: TRENCH,
    Blurryface: BF,
    Vessel: VSL,
    "Regional at Best": RAB,
    "Self Titled": ST
};

export const Options: CommandOptions = {
    description: "Get a role for one of the band's albums",
    options: [
        {
            name: "album",
            description: "The album role to get",
            required: true,
            type: CommandOptionType.STRING,
            choices: Object.entries(albumRoles).map(([name, roleID]) => ({
                name,
                value: roleID
            }))
        }
    ]
};

export const Executor: CommandRunner<{ album: Snowflake }> = async (ctx) => {
    if (!ctx.member.roles.cache.has(roles.staff)) return ctx.send("This command is disabled");
    const roleID = ctx.opts.album;

    const idList = Object.values(albumRoles);

    if (!idList.some((r) => r === roleID)) throw new CommandError("Not a valid album");

    let removedAll = false;
    for (const id of idList) {
        if (ctx.member.roles.cache.has(id)) {
            await ctx.member.roles.remove(id);
            if (id === roleID) removedAll = true;
        }
    }

    if (removedAll) return ctx.embed(new MessageEmbed().setDescription("Your album role was removed"));

    await ctx.member.roles.add(roleID);
    const role = await ctx.member.guild.roles.fetch(roleID);
    if (!role) throw new CommandError("Unable to find role");

    ctx.embed(new MessageEmbed().setDescription(`You now have the ${role.name} album role!`).setColor(role.color));
};
