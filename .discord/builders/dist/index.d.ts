import { APIEmbedField, APIEmbed, APIEmbedThumbnail, APIEmbedImage, APIEmbedVideo, APIEmbedAuthor, APIEmbedProvider, APIEmbedFooter, APIMessageComponentEmoji, APISelectMenuOption, ButtonStyle, APIMessageComponent, APIActionRowComponent, APIModalComponent, ComponentType, TextInputStyle, APITextInputComponent, APIButtonComponent, APIActionRowComponentTypes, APIModalInteractionResponseCallbackData, APISelectMenuComponent, ApplicationCommandOptionType, APIApplicationCommandBasicOption, APIApplicationCommandBooleanOption, ChannelType, APIApplicationCommandChannelOption, APIApplicationCommandOptionChoice, APIApplicationCommandIntegerOption, APIApplicationCommandMentionableOption, APIApplicationCommandNumberOption, APIApplicationCommandRoleOption, APIApplicationCommandStringOption, APIApplicationCommandUserOption, APIApplicationCommandSubcommandGroupOption, APIApplicationCommandSubcommandOption, RESTPostAPIApplicationCommandsJSONBody, APIApplicationCommandOption, ApplicationCommandType } from 'discord-api-types/v9';
import { z } from 'zod';
import { Snowflake } from 'discord-api-types/globals';
import { URL } from 'url';

declare const fieldNamePredicate: z.ZodString;
declare const fieldValuePredicate: z.ZodString;
declare const fieldInlinePredicate: z.ZodOptional<z.ZodBoolean>;
declare const embedFieldPredicate: z.ZodObject<{
    name: z.ZodString;
    value: z.ZodString;
    inline: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    inline?: boolean | undefined;
    name: string;
    value: string;
}, {
    inline?: boolean | undefined;
    name: string;
    value: string;
}>;
declare const embedFieldsArrayPredicate: z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    value: z.ZodString;
    inline: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    inline?: boolean | undefined;
    name: string;
    value: string;
}, {
    inline?: boolean | undefined;
    name: string;
    value: string;
}>, "many">;
declare const fieldLengthPredicate: z.ZodNumber;
declare function validateFieldLength(fields: APIEmbedField[], amountAdding: number): void;
declare const authorNamePredicate: z.ZodNullable<z.ZodString>;
declare const urlPredicate: z.ZodNullable<z.ZodOptional<z.ZodString>>;
declare const colorPredicate: z.ZodNullable<z.ZodNumber>;
declare const descriptionPredicate: z.ZodNullable<z.ZodString>;
declare const footerTextPredicate: z.ZodNullable<z.ZodString>;
declare const timestampPredicate: z.ZodNullable<z.ZodUnion<[z.ZodNumber, z.ZodDate]>>;
declare const titlePredicate: z.ZodNullable<z.ZodString>;

declare const Assertions$3_fieldNamePredicate: typeof fieldNamePredicate;
declare const Assertions$3_fieldValuePredicate: typeof fieldValuePredicate;
declare const Assertions$3_fieldInlinePredicate: typeof fieldInlinePredicate;
declare const Assertions$3_embedFieldPredicate: typeof embedFieldPredicate;
declare const Assertions$3_embedFieldsArrayPredicate: typeof embedFieldsArrayPredicate;
declare const Assertions$3_fieldLengthPredicate: typeof fieldLengthPredicate;
declare const Assertions$3_validateFieldLength: typeof validateFieldLength;
declare const Assertions$3_authorNamePredicate: typeof authorNamePredicate;
declare const Assertions$3_urlPredicate: typeof urlPredicate;
declare const Assertions$3_colorPredicate: typeof colorPredicate;
declare const Assertions$3_descriptionPredicate: typeof descriptionPredicate;
declare const Assertions$3_footerTextPredicate: typeof footerTextPredicate;
declare const Assertions$3_timestampPredicate: typeof timestampPredicate;
declare const Assertions$3_titlePredicate: typeof titlePredicate;
declare namespace Assertions$3 {
  export {
    Assertions$3_fieldNamePredicate as fieldNamePredicate,
    Assertions$3_fieldValuePredicate as fieldValuePredicate,
    Assertions$3_fieldInlinePredicate as fieldInlinePredicate,
    Assertions$3_embedFieldPredicate as embedFieldPredicate,
    Assertions$3_embedFieldsArrayPredicate as embedFieldsArrayPredicate,
    Assertions$3_fieldLengthPredicate as fieldLengthPredicate,
    Assertions$3_validateFieldLength as validateFieldLength,
    Assertions$3_authorNamePredicate as authorNamePredicate,
    Assertions$3_urlPredicate as urlPredicate,
    Assertions$3_colorPredicate as colorPredicate,
    Assertions$3_descriptionPredicate as descriptionPredicate,
    Assertions$3_footerTextPredicate as footerTextPredicate,
    Assertions$3_timestampPredicate as timestampPredicate,
    Assertions$3_titlePredicate as titlePredicate,
  };
}

interface JSONEncodable<T> {
    /**
     * Transforms this object to its JSON format
     */
    toJSON: () => T;
}
/**
 * Indicates if an object is encodable or not.
 * @param maybeEncodable The object to check against
 */
declare function isJSONEncodable(maybeEncodable: unknown): maybeEncodable is JSONEncodable<unknown>;

interface AuthorOptions {
    name: string;
    url?: string;
    iconURL?: string;
}
interface FooterOptions {
    text: string;
    iconURL?: string;
}
declare class UnsafeEmbed implements APIEmbed, JSONEncodable<APIEmbed> {
    /**
     * An array of fields of this embed
     */
    readonly fields: APIEmbedField[];
    /**
     * The embed title
     */
    readonly title?: string;
    /**
     * The embed description
     */
    readonly description?: string;
    /**
     * The embed url
     */
    readonly url?: string;
    /**
     * The embed color
     */
    readonly color?: number;
    /**
     * The timestamp of the embed in the ISO format
     */
    readonly timestamp?: string;
    /**
     * The embed thumbnail data
     */
    readonly thumbnail?: APIEmbedThumbnail;
    /**
     * The embed image data
     */
    readonly image?: APIEmbedImage;
    /**
     * Received video data
     */
    readonly video?: APIEmbedVideo;
    /**
     * The embed author data
     */
    readonly author?: APIEmbedAuthor;
    /**
     * Received data about the embed provider
     */
    readonly provider?: APIEmbedProvider;
    /**
     * The embed footer data
     */
    readonly footer?: APIEmbedFooter;
    constructor(data?: APIEmbed);
    /**
     * The accumulated length for the embed title, description, fields, footer text, and author name
     */
    get length(): number;
    /**
     * Adds a field to the embed (max 25)
     *
     * @param field The field to add.
     */
    addField(field: APIEmbedField): this;
    /**
     * Adds fields to the embed (max 25)
     *
     * @param fields The fields to add
     */
    addFields(...fields: APIEmbedField[]): this;
    /**
     * Removes, replaces, or inserts fields in the embed (max 25)
     *
     * @param index The index to start at
     * @param deleteCount The number of fields to remove
     * @param fields The replacing field objects
     */
    spliceFields(index: number, deleteCount: number, ...fields: APIEmbedField[]): this;
    /**
     * Sets the embed's fields (max 25).
     * @param fields The fields to set
     */
    setFields(...fields: APIEmbedField[]): this;
    /**
     * Sets the author of this embed
     *
     * @param options The options for the author
     */
    setAuthor(options: AuthorOptions | null): this;
    /**
     * Sets the color of this embed
     *
     * @param color The color of the embed
     */
    setColor(color: number | null): this;
    /**
     * Sets the description of this embed
     *
     * @param description The description
     */
    setDescription(description: string | null): this;
    /**
     * Sets the footer of this embed
     *
     * @param options The options for the footer
     */
    setFooter(options: FooterOptions | null): this;
    /**
     * Sets the image of this embed
     *
     * @param url The URL of the image
     */
    setImage(url: string | null): this;
    /**
     * Sets the thumbnail of this embed
     *
     * @param url The URL of the thumbnail
     */
    setThumbnail(url: string | null): this;
    /**
     * Sets the timestamp of this embed
     *
     * @param timestamp The timestamp or date
     */
    setTimestamp(timestamp?: number | Date | null): this;
    /**
     * Sets the title of this embed
     *
     * @param title The title
     */
    setTitle(title: string | null): this;
    /**
     * Sets the URL of this embed
     *
     * @param url The URL
     */
    setURL(url: string | null): this;
    /**
     * Transforms the embed to a plain object
     */
    toJSON(): APIEmbed;
    /**
     * Normalizes field input and resolves strings
     *
     * @param fields Fields to normalize
     */
    static normalizeFields(...fields: APIEmbedField[]): APIEmbedField[];
}

/**
 * Represents an embed in a message (image/video preview, rich embed, etc.)
 */
declare class Embed extends UnsafeEmbed {
    addFields(...fields: APIEmbedField[]): this;
    spliceFields(index: number, deleteCount: number, ...fields: APIEmbedField[]): this;
    setAuthor(options: AuthorOptions | null): this;
    setColor(color: number | null): this;
    setDescription(description: string | null): this;
    setFooter(options: FooterOptions | null): this;
    setImage(url: string | null): this;
    setThumbnail(url: string | null): this;
    setTimestamp(timestamp?: number | Date | null): this;
    setTitle(title: string | null): this;
    setURL(url: string | null): this;
    /**
     * Normalizes field input and resolves strings
     *
     * @param fields Fields to normalize
     */
    static normalizeFields(...fields: APIEmbedField[]): APIEmbedField[];
}

/**
 * Wraps the content inside a codeblock with no language
 *
 * @param content The content to wrap
 */
declare function codeBlock<C extends string>(content: C): `\`\`\`\n${C}\`\`\``;
/**
 * Wraps the content inside a codeblock with the specified language
 *
 * @param language The language for the codeblock
 * @param content The content to wrap
 */
declare function codeBlock<L extends string, C extends string>(language: L, content: C): `\`\`\`${L}\n${C}\`\`\``;
/**
 * Wraps the content inside \`backticks\`, which formats it as inline code
 *
 * @param content The content to wrap
 */
declare function inlineCode<C extends string>(content: C): `\`${C}\``;
/**
 * Formats the content into italic text
 *
 * @param content The content to wrap
 */
declare function italic<C extends string>(content: C): `_${C}_`;
/**
 * Formats the content into bold text
 *
 * @param content The content to wrap
 */
declare function bold<C extends string>(content: C): `**${C}**`;
/**
 * Formats the content into underscored text
 *
 * @param content The content to wrap
 */
declare function underscore<C extends string>(content: C): `__${C}__`;
/**
 * Formats the content into strike-through text
 *
 * @param content The content to wrap
 */
declare function strikethrough<C extends string>(content: C): `~~${C}~~`;
/**
 * Formats the content into a quote. This needs to be at the start of the line for Discord to format it
 *
 * @param content The content to wrap
 */
declare function quote<C extends string>(content: C): `> ${C}`;
/**
 * Formats the content into a block quote. This needs to be at the start of the line for Discord to format it
 *
 * @param content The content to wrap
 */
declare function blockQuote<C extends string>(content: C): `>>> ${C}`;
/**
 * Wraps the URL into `<>`, which stops it from embedding
 *
 * @param url The URL to wrap
 */
declare function hideLinkEmbed<C extends string>(url: C): `<${C}>`;
/**
 * Wraps the URL into `<>`, which stops it from embedding
 *
 * @param url The URL to wrap
 */
declare function hideLinkEmbed(url: URL): `<${string}>`;
/**
 * Formats the content and the URL into a masked URL
 *
 * @param content The content to display
 * @param url The URL the content links to
 */
declare function hyperlink<C extends string>(content: C, url: URL): `[${C}](${string})`;
/**
 * Formats the content and the URL into a masked URL
 *
 * @param content The content to display
 * @param url The URL the content links to
 */
declare function hyperlink<C extends string, U extends string>(content: C, url: U): `[${C}](${U})`;
/**
 * Formats the content and the URL into a masked URL
 *
 * @param content The content to display
 * @param url The URL the content links to
 * @param title The title shown when hovering on the masked link
 */
declare function hyperlink<C extends string, T extends string>(content: C, url: URL, title: T): `[${C}](${string} "${T}")`;
/**
 * Formats the content and the URL into a masked URL
 *
 * @param content The content to display
 * @param url The URL the content links to
 * @param title The title shown when hovering on the masked link
 */
declare function hyperlink<C extends string, U extends string, T extends string>(content: C, url: U, title: T): `[${C}](${U} "${T}")`;
/**
 * Wraps the content inside spoiler (hidden text)
 *
 * @param content The content to wrap
 */
declare function spoiler<C extends string>(content: C): `||${C}||`;
/**
 * Formats a user ID into a user mention
 *
 * @param userId The user ID to format
 */
declare function userMention<C extends Snowflake>(userId: C): `<@${C}>`;
/**
 * Formats a user ID into a member-nickname mention
 *
 * @param memberId The user ID to format
 */
declare function memberNicknameMention<C extends Snowflake>(memberId: C): `<@!${C}>`;
/**
 * Formats a channel ID into a channel mention
 *
 * @param channelId The channel ID to format
 */
declare function channelMention<C extends Snowflake>(channelId: C): `<#${C}>`;
/**
 * Formats a role ID into a role mention
 *
 * @param roleId The role ID to format
 */
declare function roleMention<C extends Snowflake>(roleId: C): `<@&${C}>`;
/**
 * Formats an emoji ID into a fully qualified emoji identifier
 *
 * @param emojiId The emoji ID to format
 */
declare function formatEmoji<C extends Snowflake>(emojiId: C, animated?: false): `<:_:${C}>`;
/**
 * Formats an emoji ID into a fully qualified emoji identifier
 *
 * @param emojiId The emoji ID to format
 * @param animated Whether the emoji is animated or not. Defaults to `false`
 */
declare function formatEmoji<C extends Snowflake>(emojiId: C, animated?: true): `<a:_:${C}>`;
/**
 * Formats a date into a short date-time string
 *
 * @param date The date to format, defaults to the current time
 */
declare function time(date?: Date): `<t:${bigint}>`;
/**
 * Formats a date given a format style
 *
 * @param date The date to format
 * @param style The style to use
 */
declare function time<S extends TimestampStylesString>(date: Date, style: S): `<t:${bigint}:${S}>`;
/**
 * Formats the given timestamp into a short date-time string
 *
 * @param seconds The time to format, represents an UNIX timestamp in seconds
 */
declare function time<C extends number>(seconds: C): `<t:${C}>`;
/**
 * Formats the given timestamp into a short date-time string
 *
 * @param seconds The time to format, represents an UNIX timestamp in seconds
 * @param style The style to use
 */
declare function time<C extends number, S extends TimestampStylesString>(seconds: C, style: S): `<t:${C}:${S}>`;
/**
 * The [message formatting timestamp styles](https://discord.com/developers/docs/reference#message-formatting-timestamp-styles) supported by Discord
 */
declare const TimestampStyles: {
    /**
     * Short time format, consisting of hours and minutes, e.g. 16:20
     */
    readonly ShortTime: "t";
    /**
     * Long time format, consisting of hours, minutes, and seconds, e.g. 16:20:30
     */
    readonly LongTime: "T";
    /**
     * Short date format, consisting of day, month, and year, e.g. 20/04/2021
     */
    readonly ShortDate: "d";
    /**
     * Long date format, consisting of day, month, and year, e.g. 20 April 2021
     */
    readonly LongDate: "D";
    /**
     * Short date-time format, consisting of short date and short time formats, e.g. 20 April 2021 16:20
     */
    readonly ShortDateTime: "f";
    /**
     * Long date-time format, consisting of long date and short time formats, e.g. Tuesday, 20 April 2021 16:20
     */
    readonly LongDateTime: "F";
    /**
     * Relative time format, consisting of a relative duration format, e.g. 2 months ago
     */
    readonly RelativeTime: "R";
};
/**
 * The possible values, see {@link TimestampStyles} for more information
 */
declare type TimestampStylesString = typeof TimestampStyles[keyof typeof TimestampStyles];
/**
 * An enum with all the available faces from Discord's native slash commands
 */
declare enum Faces {
    /**
     * ¯\\_(ツ)\\_/¯
     */
    Shrug = "\u00AF\\_(\u30C4)\\_/\u00AF",
    /**
     * (╯°□°）╯︵ ┻━┻
     */
    Tableflip = "(\u256F\u00B0\u25A1\u00B0\uFF09\u256F\uFE35 \u253B\u2501\u253B",
    /**
     * ┬─┬ ノ( ゜-゜ノ)
     */
    Unflip = "\u252C\u2500\u252C \u30CE( \u309C-\u309C\u30CE)"
}

/**
 * Represents a non-validated option within a select menu component
 */
declare class UnsafeSelectMenuOption {
    readonly label: string;
    readonly value: string;
    readonly description?: string;
    readonly emoji?: APIMessageComponentEmoji;
    readonly default?: boolean;
    constructor(data?: APISelectMenuOption);
    /**
     * Sets the label of this option
     * @param label The label to show on this option
     */
    setLabel(label: string): this;
    /**
     * Sets the value of this option
     * @param value The value of this option
     */
    setValue(value: string): this;
    /**
     * Sets the description of this option.
     * @param description The description of this option
     */
    setDescription(description: string): this;
    /**
     * Sets whether this option is selected by default
     * @param isDefault Whether or not this option is selected by default
     */
    setDefault(isDefault: boolean): this;
    /**
     * Sets the emoji to display on this button
     * @param emoji The emoji to display on this button
     */
    setEmoji(emoji: APIMessageComponentEmoji): this;
    toJSON(): APISelectMenuOption;
}

/**
 * Represents an option within a select menu component
 */
declare class SelectMenuOption extends UnsafeSelectMenuOption {
    setDescription(description: string): this;
    setDefault(isDefault: boolean): this;
    setEmoji(emoji: APIMessageComponentEmoji): this;
    toJSON(): APISelectMenuOption;
}

declare const customIdValidator: z.ZodString;
declare const emojiValidator: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    animated: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    name?: string | undefined;
    id?: string | undefined;
    animated?: boolean | undefined;
}, {
    name?: string | undefined;
    id?: string | undefined;
    animated?: boolean | undefined;
}>;
declare const disabledValidator: z.ZodBoolean;
declare const buttonLabelValidator: z.ZodString;
declare const buttonStyleValidator: z.ZodNumber;
declare const placeholderValidator: z.ZodString;
declare const minMaxValidator: z.ZodNumber;
declare const optionsValidator: z.ZodArray<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>, "atleastone">;
declare function validateRequiredSelectMenuParameters(options: SelectMenuOption[], customId?: string): void;
declare const labelValueValidator: z.ZodString;
declare const defaultValidator: z.ZodBoolean;
declare function validateRequiredSelectMenuOptionParameters(label?: string, value?: string): void;
declare const urlValidator: z.ZodString;
declare function validateRequiredButtonParameters(style: ButtonStyle, label?: string, emoji?: APIMessageComponentEmoji, customId?: string, url?: string): void;

declare const Assertions$2_customIdValidator: typeof customIdValidator;
declare const Assertions$2_emojiValidator: typeof emojiValidator;
declare const Assertions$2_disabledValidator: typeof disabledValidator;
declare const Assertions$2_buttonLabelValidator: typeof buttonLabelValidator;
declare const Assertions$2_buttonStyleValidator: typeof buttonStyleValidator;
declare const Assertions$2_placeholderValidator: typeof placeholderValidator;
declare const Assertions$2_minMaxValidator: typeof minMaxValidator;
declare const Assertions$2_optionsValidator: typeof optionsValidator;
declare const Assertions$2_validateRequiredSelectMenuParameters: typeof validateRequiredSelectMenuParameters;
declare const Assertions$2_labelValueValidator: typeof labelValueValidator;
declare const Assertions$2_defaultValidator: typeof defaultValidator;
declare const Assertions$2_validateRequiredSelectMenuOptionParameters: typeof validateRequiredSelectMenuOptionParameters;
declare const Assertions$2_urlValidator: typeof urlValidator;
declare const Assertions$2_validateRequiredButtonParameters: typeof validateRequiredButtonParameters;
declare namespace Assertions$2 {
  export {
    Assertions$2_customIdValidator as customIdValidator,
    Assertions$2_emojiValidator as emojiValidator,
    Assertions$2_disabledValidator as disabledValidator,
    Assertions$2_buttonLabelValidator as buttonLabelValidator,
    Assertions$2_buttonStyleValidator as buttonStyleValidator,
    Assertions$2_placeholderValidator as placeholderValidator,
    Assertions$2_minMaxValidator as minMaxValidator,
    Assertions$2_optionsValidator as optionsValidator,
    Assertions$2_validateRequiredSelectMenuParameters as validateRequiredSelectMenuParameters,
    Assertions$2_labelValueValidator as labelValueValidator,
    Assertions$2_defaultValidator as defaultValidator,
    Assertions$2_validateRequiredSelectMenuOptionParameters as validateRequiredSelectMenuOptionParameters,
    Assertions$2_urlValidator as urlValidator,
    Assertions$2_validateRequiredButtonParameters as validateRequiredButtonParameters,
  };
}

/**
 * Represents a discord component
 */
interface Component extends JSONEncodable<APIMessageComponent | APIActionRowComponent<APIModalComponent>> {
    /**
     * The type of this component
     */
    readonly type: ComponentType;
}

declare class TextInputComponent implements Component {
    readonly type: ComponentType.TextInput;
    readonly custom_id: string;
    readonly label: string;
    readonly style: TextInputStyle;
    readonly min_length?: number;
    readonly max_length?: number;
    readonly placeholder?: string;
    readonly value?: string;
    /**
     * Sets the custom id for this input text
     * @param customId The custom id of this input text
     */
    setCustomId(customId: string): this;
    /**
     * Sets the label for this input text
     * @param label The label for this input text
     */
    setLabel(label: string): this;
    /**
     * Sets the style for this input text
     * @param style The style for this input text
     */
    setStyle(style: number): this;
    /**
     * Sets the minimum length of text for this input text
     * @param minLength The minimum length of text for this input text
     */
    setMinLength(minLength: number): this;
    /**
     * Sets the maximum length of text for this input text
     * @param maxLength The maximum length of text for this input text
     */
    setMaxLength(maxLength: number): this;
    /**
     * Sets the placeholder of this input text
     * @param placeholder The placeholder of this input text
     */
    setPlaceholder(placeholder: string): this;
    /**
     * Sets the value of this input text
     * @param value The value for this input text
     * @returns
     */
    setValue(value: string): this;
    toJSON(): APITextInputComponent;
}

declare type MessageComponent = ActionRowComponent | ActionRow;
declare type ActionRowComponent = ButtonComponent | SelectMenuComponent;
declare type ModalActionRowComponent = TextInputComponent;
/**
 * Represents an action row component
 */
declare class ActionRow<T extends ActionRowComponent | ModalActionRowComponent = ActionRowComponent> implements Component {
    readonly components: T[];
    readonly type = ComponentType.ActionRow;
    constructor(data?: APIActionRowComponent<APIModalComponent | APIMessageComponent> & {
        type?: ComponentType.ActionRow;
    });
    /**
     * Adds components to this action row.
     * @param components The components to add to this action row.
     * @returns
     */
    addComponents(...components: T[]): this;
    /**
     * Sets the components in this action row
     * @param components The components to set this row to
     */
    setComponents(components: T[]): this;
    toJSON(): APIActionRowComponent<APIModalComponent>;
}

declare class UnsafeButtonComponent implements Component {
    readonly type: ComponentType.Button;
    readonly style: ButtonStyle;
    readonly label?: string;
    readonly emoji?: APIMessageComponentEmoji;
    readonly disabled?: boolean;
    readonly custom_id: string;
    readonly url: string;
    constructor(data?: APIButtonComponent & {
        type?: ComponentType.Button;
    });
    /**
     * Sets the style of this button
     * @param style The style of the button
     */
    setStyle(style: ButtonStyle): this;
    /**
     * Sets the URL for this button
     * @param url The URL to open when this button is clicked
     */
    setURL(url: string): this;
    /**
     * Sets the custom Id for this button
     * @param customId The custom ID to use for this button
     */
    setCustomId(customId: string): this;
    /**
     * Sets the emoji to display on this button
     * @param emoji The emoji to display on this button
     */
    setEmoji(emoji: APIMessageComponentEmoji): this;
    /**
     * Sets whether this button is disable or not
     * @param disabled Whether or not to disable this button or not
     */
    setDisabled(disabled: boolean): this;
    /**
     * Sets the label for this button
     * @param label The label to display on this button
     */
    setLabel(label: string): this;
    toJSON(): APIButtonComponent;
}

declare class ButtonComponent extends UnsafeButtonComponent {
    setStyle(style: ButtonStyle): this;
    setURL(url: string): this;
    setCustomId(customId: string): this;
    setEmoji(emoji: APIMessageComponentEmoji): this;
    setDisabled(disabled: boolean): this;
    setLabel(label: string): this;
    toJSON(): APIButtonComponent;
}

interface MappedComponentTypes {
    [ComponentType.ActionRow]: ActionRow;
    [ComponentType.Button]: ButtonComponent;
    [ComponentType.SelectMenu]: SelectMenuComponent;
    [ComponentType.TextInput]: TextInputComponent;
}
/**
 * Factory for creating components from API data
 * @param data The api data to transform to a component class
 */
declare function createComponent<T extends keyof MappedComponentTypes>(data: APIMessageComponent & {
    type: T;
}): MappedComponentTypes[T];
declare function createComponent<C extends APIActionRowComponentTypes>(data: C): C;

declare class Modal {
    readonly title: string;
    readonly custom_id: string;
    readonly components: ActionRow<ModalActionRowComponent>[];
    constructor(data?: APIModalInteractionResponseCallbackData);
    /**
     * Sets the title of the modal
     * @param title The title of the modal
     */
    setTitle(title: string): this;
    /**
     * Sets the custom Id of the modal
     * @param customId The custom Id of this modal
     */
    setCustomId(customId: string): this;
    /**
     * Adds components to this modal
     * @param components The components to add to this modal
     */
    addComponents(...components: ActionRow<ModalActionRowComponent>[]): this;
    /**
     * Sets the components in this modal
     * @param components The components to set this modal to
     */
    setComponents(...components: ActionRow<ModalActionRowComponent>[]): this;
    toJSON(): unknown;
}

/**
 * Represents a non-validated select menu component
 */
declare class UnsafeSelectMenuComponent implements Component {
    readonly type: ComponentType.SelectMenu;
    readonly options: SelectMenuOption[];
    readonly placeholder?: string;
    readonly min_values?: number;
    readonly max_values?: number;
    readonly custom_id: string;
    readonly disabled?: boolean;
    constructor(data?: APISelectMenuComponent);
    /**
     * Sets the placeholder for this select menu
     * @param placeholder The placeholder to use for this select menu
     */
    setPlaceholder(placeholder: string): this;
    /**
     * Sets thes minimum values that must be selected in the select menu
     * @param minValues The minimum values that must be selected
     */
    setMinValues(minValues: number): this;
    /**
     * Sets thes maximum values that must be selected in the select menu
     * @param minValues The maximum values that must be selected
     */
    setMaxValues(maxValues: number): this;
    /**
     * Sets the custom Id for this select menu
     * @param customId The custom ID to use for this select menu
     */
    setCustomId(customId: string): this;
    /**
     * Sets whether or not this select menu is disabled
     * @param disabled Whether or not this select menu is disabled
     */
    setDisabled(disabled: boolean): this;
    /**
     * Adds options to this select menu
     * @param options The options to add to this select menu
     * @returns
     */
    addOptions(...options: SelectMenuOption[]): this;
    /**
     * Sets the options on this select menu
     * @param options The options to set on this select menu
     */
    setOptions(options: SelectMenuOption[]): this;
    toJSON(): APISelectMenuComponent;
}

/**
 * Represents a select menu component
 */
declare class SelectMenuComponent extends UnsafeSelectMenuComponent {
    setPlaceholder(placeholder: string): this;
    setMinValues(minValues: number): this;
    setMaxValues(maxValues: number): this;
    setCustomId(customId: string): this;
    setDisabled(disabled: boolean): this;
    toJSON(): APISelectMenuComponent;
}

declare class SharedNameAndDescription {
    readonly name: string;
    readonly description: string;
    /**
     * Sets the name
     *
     * @param name The name
     */
    setName(name: string): this;
    /**
     * Sets the description
     *
     * @param description The description
     */
    setDescription(description: string): this;
}

declare abstract class ApplicationCommandOptionBase extends SharedNameAndDescription {
    abstract readonly type: ApplicationCommandOptionType;
    readonly required: boolean;
    /**
     * Marks the option as required
     *
     * @param required If this option should be required
     */
    setRequired(required: boolean): this;
    abstract toJSON(): APIApplicationCommandBasicOption;
    protected runRequiredValidations(): void;
}

declare class SlashCommandBooleanOption extends ApplicationCommandOptionBase {
    readonly type: ApplicationCommandOptionType.Boolean;
    toJSON(): APIApplicationCommandBooleanOption;
}

declare const allowedChannelTypes: readonly [ChannelType.GuildText, ChannelType.GuildVoice, ChannelType.GuildCategory, ChannelType.GuildNews, ChannelType.GuildStore, ChannelType.GuildNewsThread, ChannelType.GuildPublicThread, ChannelType.GuildPrivateThread, ChannelType.GuildStageVoice];
declare type ApplicationCommandOptionAllowedChannelTypes = typeof allowedChannelTypes[number];
declare class ApplicationCommandOptionChannelTypesMixin {
    readonly channel_types?: ApplicationCommandOptionAllowedChannelTypes[];
    /**
     * Adds a channel type to this option
     *
     * @param channelType The type of channel to allow
     */
    addChannelType(channelType: ApplicationCommandOptionAllowedChannelTypes): this;
    /**
     * Adds channel types to this option
     *
     * @param channelTypes The channel types to add
     */
    addChannelTypes(channelTypes: ApplicationCommandOptionAllowedChannelTypes[]): this;
}

declare class SlashCommandChannelOption extends ApplicationCommandOptionBase {
    readonly type: ApplicationCommandOptionType.Channel;
    toJSON(): APIApplicationCommandChannelOption;
}
interface SlashCommandChannelOption extends ApplicationCommandOptionChannelTypesMixin {
}

declare abstract class ApplicationCommandNumericOptionMinMaxValueMixin {
    readonly max_value?: number;
    readonly min_value?: number;
    /**
     * Sets the maximum number value of this option
     * @param max The maximum value this option can be
     */
    abstract setMaxValue(max: number): this;
    /**
     * Sets the minimum number value of this option
     * @param min The minimum value this option can be
     */
    abstract setMinValue(min: number): this;
}

declare class ApplicationCommandOptionWithChoicesAndAutocompleteMixin<T extends string | number> {
    readonly choices?: APIApplicationCommandOptionChoice<T>[];
    readonly autocomplete?: boolean;
    readonly type: ApplicationCommandOptionType;
    /**
     * Adds a choice for this option
     *
     * @param name The name of the choice
     * @param value The value of the choice
     */
    addChoice(name: string, value: T): this;
    /**
     * Adds multiple choices for this option
     *
     * @param choices The choices to add
     */
    addChoices(choices: [name: string, value: T][]): this;
    setChoices(choices: [name: string, value: T][]): this;
    /**
     * Marks the option as autocompletable
     * @param autocomplete If this option should be autocompletable
     */
    setAutocomplete(autocomplete: boolean): this;
}

declare class SlashCommandIntegerOption extends ApplicationCommandOptionBase implements ApplicationCommandNumericOptionMinMaxValueMixin {
    readonly type: ApplicationCommandOptionType.Integer;
    setMaxValue(max: number): this;
    setMinValue(min: number): this;
    toJSON(): APIApplicationCommandIntegerOption;
}
interface SlashCommandIntegerOption extends ApplicationCommandNumericOptionMinMaxValueMixin, ApplicationCommandOptionWithChoicesAndAutocompleteMixin<number> {
}

declare class SlashCommandMentionableOption extends ApplicationCommandOptionBase {
    readonly type: ApplicationCommandOptionType.Mentionable;
    toJSON(): APIApplicationCommandMentionableOption;
}

declare class SlashCommandNumberOption extends ApplicationCommandOptionBase implements ApplicationCommandNumericOptionMinMaxValueMixin {
    readonly type: ApplicationCommandOptionType.Number;
    setMaxValue(max: number): this;
    setMinValue(min: number): this;
    toJSON(): APIApplicationCommandNumberOption;
}
interface SlashCommandNumberOption extends ApplicationCommandNumericOptionMinMaxValueMixin, ApplicationCommandOptionWithChoicesAndAutocompleteMixin<number> {
}

declare class SlashCommandRoleOption extends ApplicationCommandOptionBase {
    readonly type: ApplicationCommandOptionType.Role;
    toJSON(): APIApplicationCommandRoleOption;
}

declare class SlashCommandStringOption extends ApplicationCommandOptionBase {
    readonly type: ApplicationCommandOptionType.String;
    toJSON(): APIApplicationCommandStringOption;
}
interface SlashCommandStringOption extends ApplicationCommandOptionWithChoicesAndAutocompleteMixin<string> {
}

declare class SlashCommandUserOption extends ApplicationCommandOptionBase {
    readonly type: ApplicationCommandOptionType.User;
    toJSON(): APIApplicationCommandUserOption;
}

declare class SharedSlashCommandOptions<ShouldOmitSubcommandFunctions = true> {
    readonly options: ToAPIApplicationCommandOptions[];
    /**
     * Adds a boolean option
     *
     * @param input A function that returns an option builder, or an already built builder
     */
    addBooleanOption(input: SlashCommandBooleanOption | ((builder: SlashCommandBooleanOption) => SlashCommandBooleanOption)): ShouldOmitSubcommandFunctions extends true ? Omit<this, "addSubcommand" | "addSubcommandGroup"> : this;
    /**
     * Adds a user option
     *
     * @param input A function that returns an option builder, or an already built builder
     */
    addUserOption(input: SlashCommandUserOption | ((builder: SlashCommandUserOption) => SlashCommandUserOption)): ShouldOmitSubcommandFunctions extends true ? Omit<this, "addSubcommand" | "addSubcommandGroup"> : this;
    /**
     * Adds a channel option
     *
     * @param input A function that returns an option builder, or an already built builder
     */
    addChannelOption(input: SlashCommandChannelOption | ((builder: SlashCommandChannelOption) => SlashCommandChannelOption)): ShouldOmitSubcommandFunctions extends true ? Omit<this, "addSubcommand" | "addSubcommandGroup"> : this;
    /**
     * Adds a role option
     *
     * @param input A function that returns an option builder, or an already built builder
     */
    addRoleOption(input: SlashCommandRoleOption | ((builder: SlashCommandRoleOption) => SlashCommandRoleOption)): ShouldOmitSubcommandFunctions extends true ? Omit<this, "addSubcommand" | "addSubcommandGroup"> : this;
    /**
     * Adds a mentionable option
     *
     * @param input A function that returns an option builder, or an already built builder
     */
    addMentionableOption(input: SlashCommandMentionableOption | ((builder: SlashCommandMentionableOption) => SlashCommandMentionableOption)): ShouldOmitSubcommandFunctions extends true ? Omit<this, "addSubcommand" | "addSubcommandGroup"> : this;
    /**
     * Adds a string option
     *
     * @param input A function that returns an option builder, or an already built builder
     */
    addStringOption(input: SlashCommandStringOption | Omit<SlashCommandStringOption, 'setAutocomplete'> | Omit<SlashCommandStringOption, 'addChoice' | 'addChoices'> | ((builder: SlashCommandStringOption) => SlashCommandStringOption | Omit<SlashCommandStringOption, 'setAutocomplete'> | Omit<SlashCommandStringOption, 'addChoice' | 'addChoices'>)): ShouldOmitSubcommandFunctions extends true ? Omit<this, "addSubcommand" | "addSubcommandGroup"> : this;
    /**
     * Adds an integer option
     *
     * @param input A function that returns an option builder, or an already built builder
     */
    addIntegerOption(input: SlashCommandIntegerOption | Omit<SlashCommandIntegerOption, 'setAutocomplete'> | Omit<SlashCommandIntegerOption, 'addChoice' | 'addChoices'> | ((builder: SlashCommandIntegerOption) => SlashCommandIntegerOption | Omit<SlashCommandIntegerOption, 'setAutocomplete'> | Omit<SlashCommandIntegerOption, 'addChoice' | 'addChoices'>)): ShouldOmitSubcommandFunctions extends true ? Omit<this, "addSubcommand" | "addSubcommandGroup"> : this;
    /**
     * Adds a number option
     *
     * @param input A function that returns an option builder, or an already built builder
     */
    addNumberOption(input: SlashCommandNumberOption | Omit<SlashCommandNumberOption, 'setAutocomplete'> | Omit<SlashCommandNumberOption, 'addChoice' | 'addChoices'> | ((builder: SlashCommandNumberOption) => SlashCommandNumberOption | Omit<SlashCommandNumberOption, 'setAutocomplete'> | Omit<SlashCommandNumberOption, 'addChoice' | 'addChoices'>)): ShouldOmitSubcommandFunctions extends true ? Omit<this, "addSubcommand" | "addSubcommandGroup"> : this;
    private _sharedAddOptionMethod;
}

/**
 * Represents a folder for subcommands
 *
 * For more information, go to https://discord.com/developers/docs/interactions/application-commands#subcommands-and-subcommand-groups
 */
declare class SlashCommandSubcommandGroupBuilder implements ToAPIApplicationCommandOptions {
    /**
     * The name of this subcommand group
     */
    readonly name: string;
    /**
     * The description of this subcommand group
     */
    readonly description: string;
    /**
     * The subcommands part of this subcommand group
     */
    readonly options: SlashCommandSubcommandBuilder[];
    /**
     * Adds a new subcommand to this group
     *
     * @param input A function that returns a subcommand builder, or an already built builder
     */
    addSubcommand(input: SlashCommandSubcommandBuilder | ((subcommandGroup: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder)): this;
    toJSON(): APIApplicationCommandSubcommandGroupOption;
}
interface SlashCommandSubcommandGroupBuilder extends SharedNameAndDescription {
}
/**
 * Represents a subcommand
 *
 * For more information, go to https://discord.com/developers/docs/interactions/application-commands#subcommands-and-subcommand-groups
 */
declare class SlashCommandSubcommandBuilder implements ToAPIApplicationCommandOptions {
    /**
     * The name of this subcommand
     */
    readonly name: string;
    /**
     * The description of this subcommand
     */
    readonly description: string;
    /**
     * The options of this subcommand
     */
    readonly options: ApplicationCommandOptionBase[];
    toJSON(): APIApplicationCommandSubcommandOption;
}
interface SlashCommandSubcommandBuilder extends SharedNameAndDescription, SharedSlashCommandOptions<false> {
}

declare class SlashCommandBuilder {
    /**
     * The name of this slash command
     */
    readonly name: string;
    /**
     * The description of this slash command
     */
    readonly description: string;
    /**
     * The options of this slash command
     */
    readonly options: ToAPIApplicationCommandOptions[];
    /**
     * Whether the command is enabled by default when the app is added to a guild
     *
     * @default true
     */
    readonly defaultPermission: boolean | undefined;
    /**
     * Returns the final data that should be sent to Discord.
     *
     * **Note:** Calling this function will validate required properties based on their conditions.
     */
    toJSON(): RESTPostAPIApplicationCommandsJSONBody;
    /**
     * Sets whether the command is enabled by default when the application is added to a guild.
     *
     * **Note**: If set to `false`, you will have to later `PUT` the permissions for this command.
     *
     * @param value Whether or not to enable this command by default
     *
     * @see https://discord.com/developers/docs/interactions/application-commands#permissions
     */
    setDefaultPermission(value: boolean): this;
    /**
     * Adds a new subcommand group to this command
     *
     * @param input A function that returns a subcommand group builder, or an already built builder
     */
    addSubcommandGroup(input: SlashCommandSubcommandGroupBuilder | ((subcommandGroup: SlashCommandSubcommandGroupBuilder) => SlashCommandSubcommandGroupBuilder)): SlashCommandSubcommandsOnlyBuilder;
    /**
     * Adds a new subcommand to this command
     *
     * @param input A function that returns a subcommand builder, or an already built builder
     */
    addSubcommand(input: SlashCommandSubcommandBuilder | ((subcommandGroup: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder)): SlashCommandSubcommandsOnlyBuilder;
}
interface SlashCommandBuilder extends SharedNameAndDescription, SharedSlashCommandOptions {
}
interface SlashCommandSubcommandsOnlyBuilder extends SharedNameAndDescription, Pick<SlashCommandBuilder, 'toJSON' | 'addSubcommand' | 'addSubcommandGroup'> {
}
interface SlashCommandOptionsOnlyBuilder extends SharedNameAndDescription, SharedSlashCommandOptions, Pick<SlashCommandBuilder, 'toJSON'> {
}
interface ToAPIApplicationCommandOptions {
    toJSON: () => APIApplicationCommandOption;
}

declare function validateName$1(name: unknown): asserts name is string;
declare function validateDescription(description: unknown): asserts description is string;
declare function validateMaxOptionsLength(options: unknown): asserts options is ToAPIApplicationCommandOptions[];
declare function validateRequiredParameters$1(name: string, description: string, options: ToAPIApplicationCommandOptions[]): void;
declare function validateDefaultPermission$1(value: unknown): asserts value is boolean;
declare function validateRequired(required: unknown): asserts required is boolean;
declare function validateMaxChoicesLength(choices: APIApplicationCommandOptionChoice[]): void;
declare function assertReturnOfBuilder<T extends ApplicationCommandOptionBase | SlashCommandSubcommandBuilder | SlashCommandSubcommandGroupBuilder>(input: unknown, ExpectedInstanceOf: new () => T): asserts input is T;

declare const Assertions$1_validateDescription: typeof validateDescription;
declare const Assertions$1_validateMaxOptionsLength: typeof validateMaxOptionsLength;
declare const Assertions$1_validateRequired: typeof validateRequired;
declare const Assertions$1_validateMaxChoicesLength: typeof validateMaxChoicesLength;
declare const Assertions$1_assertReturnOfBuilder: typeof assertReturnOfBuilder;
declare namespace Assertions$1 {
  export {
    validateName$1 as validateName,
    Assertions$1_validateDescription as validateDescription,
    Assertions$1_validateMaxOptionsLength as validateMaxOptionsLength,
    validateRequiredParameters$1 as validateRequiredParameters,
    validateDefaultPermission$1 as validateDefaultPermission,
    Assertions$1_validateRequired as validateRequired,
    Assertions$1_validateMaxChoicesLength as validateMaxChoicesLength,
    Assertions$1_assertReturnOfBuilder as assertReturnOfBuilder,
  };
}

declare class ContextMenuCommandBuilder {
    /**
     * The name of this context menu command
     */
    readonly name: string;
    /**
     * The type of this context menu command
     */
    readonly type: ContextMenuCommandType;
    /**
     * Whether the command is enabled by default when the app is added to a guild
     *
     * @default true
     */
    readonly defaultPermission: boolean | undefined;
    /**
     * Sets the name
     *
     * @param name The name
     */
    setName(name: string): this;
    /**
     * Sets the type
     *
     * @param type The type
     */
    setType(type: ContextMenuCommandType): this;
    /**
     * Sets whether the command is enabled by default when the application is added to a guild.
     *
     * **Note**: If set to `false`, you will have to later `PUT` the permissions for this command.
     *
     * @param value Whether or not to enable this command by default
     *
     * @see https://discord.com/developers/docs/interactions/application-commands#permissions
     */
    setDefaultPermission(value: boolean): this;
    /**
     * Returns the final data that should be sent to Discord.
     *
     * **Note:** Calling this function will validate required properties based on their conditions.
     */
    toJSON(): RESTPostAPIApplicationCommandsJSONBody;
}
declare type ContextMenuCommandType = ApplicationCommandType.User | ApplicationCommandType.Message;

declare function validateDefaultPermission(value: unknown): asserts value is boolean;
declare function validateName(name: unknown): asserts name is string;
declare function validateType(type: unknown): asserts type is ContextMenuCommandType;
declare function validateRequiredParameters(name: string, type: number): void;

declare const Assertions_validateDefaultPermission: typeof validateDefaultPermission;
declare const Assertions_validateName: typeof validateName;
declare const Assertions_validateType: typeof validateType;
declare const Assertions_validateRequiredParameters: typeof validateRequiredParameters;
declare namespace Assertions {
  export {
    Assertions_validateDefaultPermission as validateDefaultPermission,
    Assertions_validateName as validateName,
    Assertions_validateType as validateType,
    Assertions_validateRequiredParameters as validateRequiredParameters,
  };
}

export { ActionRow, ActionRowComponent, AuthorOptions, ButtonComponent, Component, Assertions$2 as ComponentAssertions, Assertions as ContextMenuCommandAssertions, ContextMenuCommandBuilder, ContextMenuCommandType, Embed, Assertions$3 as EmbedAssertions, Faces, FooterOptions, JSONEncodable, MappedComponentTypes, MessageComponent, Modal, ModalActionRowComponent, SelectMenuComponent, SelectMenuOption, Assertions$1 as SlashCommandAssertions, SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandChannelOption, SlashCommandIntegerOption, SlashCommandMentionableOption, SlashCommandNumberOption, SlashCommandOptionsOnlyBuilder, SlashCommandRoleOption, SlashCommandStringOption, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder, SlashCommandSubcommandsOnlyBuilder, SlashCommandUserOption, TextInputComponent, TimestampStyles, TimestampStylesString, ToAPIApplicationCommandOptions, UnsafeButtonComponent, UnsafeEmbed, UnsafeSelectMenuComponent, UnsafeSelectMenuOption, blockQuote, bold, channelMention, codeBlock, createComponent, formatEmoji, hideLinkEmbed, hyperlink, inlineCode, isJSONEncodable, italic, memberNicknameMention, quote, roleMention, spoiler, strikethrough, time, underscore, userMention };
