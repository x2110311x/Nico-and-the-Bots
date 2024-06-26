import { Topfeed } from "database/entities/Topfeed";
import { MessageOptions, Snowflake } from "discord.js";
import { Connection } from "typeorm";

export interface Checked<T> {
    msg: MessageOptions;
    uniqueIdentifier: string;
    _data: T;
}

export abstract class Watcher<T> {
    constructor(public handle: string, public channel: Snowflake, protected connection: Connection) {}
    abstract type: string;
    abstract fetchRecentItems(): Promise<Checked<T>[]>;

    async checkItems(items: Checked<T>[]): Promise<Checked<T>[]> {
        const uniqueIDs = items.map((item) => item.uniqueIdentifier);

        const alreadyExist = await this.connection
            .getMongoRepository(Topfeed)
            .find({ where: { hash: { $in: uniqueIDs }, type: this.type } });

        return items.filter((item) => !alreadyExist.some((tf) => tf.hash === item.uniqueIdentifier));
    }

    async fetchNewItems(): Promise<Checked<T>[]> {
        const newItems = await this.fetchRecentItems();
        return await this.checkItems(newItems);
    }
}
