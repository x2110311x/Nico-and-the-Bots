import { CommandError, CommandOptions, CommandRunner, createOptions, OptsType } from "configuration/definitions";
import { MessageEmbed } from "discord.js";
import { CommandOptionType } from "slash-create";
import Mime from "mime-types";
import normalizeUrl from "normalize-url";
import { createCanvas, loadImage } from "canvas";

export const Options = createOptions(<const>{
    description: "Put an image onto a clown's monitor 🤡",
    options: [{ name: "image", description: "The URL to the image", required: true, type: CommandOptionType.STRING }]
});

export const Executor: CommandRunner<OptsType<typeof Options>> = async (ctx) => {
    await ctx.defer();

    const url = normalizeUrl(ctx.opts.image, { stripProtocol: true, stripAuthentication: true });
    const filePath = url.split("/").slice(1).join(""); // website.something.com/path/to/image.png => path/to/image.png

    const mime = Mime.lookup(filePath);
    if (!mime || !mime.startsWith("image")) throw new CommandError("The URL provided is not an image");

    const scale = 2;

    const canvas = createCanvas(856 * scale, 480 * scale);
    const cctx = canvas.getContext("2d");

    const bg = await loadImage("./src/assets/images/clown.png");
    const img = await loadImage(ctx.opts.image);

    cctx.drawImage(bg, 0, 0, 856 * scale, 480 * scale);
    cctx.translate(23 * scale, 110 * scale);
    cctx.rotate(-Math.PI / 15.0);
    cctx.drawImage(img, 0, 0, 174 * scale, 147 * scale);

    const embed = new MessageEmbed().setImage("attachment://clown.png");

    await ctx.send({ embeds: [embed.toJSON()], file: { name: "clown.png", file: canvas.toBuffer() } });
};
