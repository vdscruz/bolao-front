import { Db, MongoClient } from "mongodb";

export type ConnectType = {
    db: Db
    client: MongoClient
}