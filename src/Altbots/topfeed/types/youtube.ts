import { MessageEmbed, MessageOptions } from "discord.js";
import secrets from "../../../Configuration/secrets";
import { Checked, Watcher } from "./base";
import Youtube from "youtube.ts";
import { parseISO } from "date-fns";

type YoutubeType = {
    url: string;
    date: Date;
    thumbnail: string;
    description: string;
};

const YOUTUBE_IMG = "https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png";
const youtube = new Youtube(secrets.apis.google.youtube);

export class YoutubeWatcher extends Watcher<YoutubeType> {
    type = "Youtube" as const;
    async fetchRecentItems(): Promise<Checked<YoutubeType>[]> {
        const channel = await youtube.channels.get(`https://www.youtube.com/user/${this.handle}`);

        const { items: videos } = await youtube.videos.search({
            channelId: channel.id,
            part: "snippet,id",
            order: "date",
            maxResults: 5
        });

        return videos.map((v) => ({
            uniqueIdentifier: v.id.videoId,
            ping: true,
            _data: {
                url: `https://www.youtube.com/watch?v=${v.id.videoId}`,
                date: parseISO(v.snippet.publishedAt),
                thumbnail: v.snippet.thumbnails.high.url,
                description: v.snippet.description
            }
        }));
    }

    async generateMessages(checkedItems: Checked<YoutubeType>[]): Promise<MessageOptions[][]> {
        return checkedItems.map((item) => {
            const embed = new MessageEmbed()
                .setAuthor(`New Youtube video from ${this.handle}`, YOUTUBE_IMG, item._data.url) // prettier-ignore
                .setThumbnail(item._data.thumbnail)
                .setDescription(item._data.description.substring(0, 250))
                .setColor("#FF0000");

            const infoMsg: MessageOptions = { embeds: [embed] };
            const ytMsg: MessageOptions = { content: item._data.url };
            return [infoMsg, ytMsg];
        });
    }
}