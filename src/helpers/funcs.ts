import { Snowflake } from "discord.js";
import * as R from "ramda";
import radix64Setup from "radix-64";
import * as bigintConversion from "bigint-conversion";

/**
 * Just some commonly used short functions
 */

const radix64 = radix64Setup();

const F = {
    titleCase: R.pipe(R.split(""), R.adjust(0, R.toUpper), R.join("")),
    lerp: (n: number, low: number, high: number): number => n * (high - low) + low,
    unlerp: (n: number, low: number, high: number): number => (n - low) / (high - low),
    // the default Object.entries function does not retain type information
    entries: <T extends Record<string, T[keyof T]>>(obj: T): [keyof T, T[keyof T]][] =>
        Object.entries(obj) as [keyof T, T[keyof T]][],
    // Rerurns [0, 1, 2, ..., n]
    indexArray: R.times(R.identity),
    randomValueInArray: <U, T extends Array<U>>(arr: T): T[number] => arr[Math.floor(Math.random() * arr.length)],
    randomSpecialCharacter: (): string => F.randomValueInArray("!@#$%&_-+=?><~".split("")),
    /**
     *
     * @param str The string to randomize
     * @param chance The probability of a character being randomized
     */
    randomizeLetters: (str: string, chance = 0.2): string => {
        const newStr = str.split("");
        for (let i = 0; i < str.length; i++) {
            if (Math.random() < chance) newStr[i] = F.randomSpecialCharacter();
        }
        return newStr.join("");
    },
    wait: (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms)),
    snowflakeToRadix64: (id: Snowflake): string => {
        return radix64.encodeBuffer(bigintConversion.bigintToBuf(BigInt(id)) as Buffer);
    },
    radix64toSnowflake: (encoded: string): Snowflake => {
        return bigintConversion.bufToBigint(radix64.decodeToBuffer(encoded)).toString() as Snowflake;
    },
    shuffle: <T>(arr: T[]): T[] => {
        const array = [...arr];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    // prettier-ignore
    canvasFitText(ctx: CanvasRenderingContext2D, text: string, font: string, opts?: { maxWidth?: number, maxFontSize?: number }): number {
        ctx.save();

        const maxWidth = opts?.maxWidth || ctx.canvas.width;
        let fontSize = opts?.maxFontSize || 100;

        do {
            ctx.font = `${fontSize}px ${font}`;
            const metrics = ctx.measureText(text);

            if (metrics.width < maxWidth) break;
        }
        while (fontSize-- > 10);
        
        ctx.restore();
        return fontSize;
    }
};

export default F;
