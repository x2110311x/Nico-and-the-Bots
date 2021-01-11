import { roles } from "configuration/config";
import { Command } from "configuration/definitions";
import { GuildMember, Message } from "discord.js";
import * as fs from "fs";

/**
 * Loads all command modules from ./commands
 * @param commands Command array to populate
 */
export const loadCommands = async function (commands: Command[]): Promise<void> {
    const files = await fs.promises.readdir("./src/commands");
    for (const file of files) {
        const command = (await import(`commands/${file}`))?.default as Command;
        if (typeof command?.name !== "string") {
            console.log(`Malformed command: ${file}`, command);
        } else {
            if (command.category === "Staff") {
                // Require all Staff commands to be used by... Staff
                command.prereqs.push((_msg: Message, member?: GuildMember): boolean => {
                    return !!member?.roles.cache.has(roles.staff);
                });
            }
            commands.push(command);
        }
    }
    Command.setCommands(commands);
};
