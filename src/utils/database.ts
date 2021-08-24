import { MongoClient } from "mongodb";
import { ConnectType } from "../types/connect-type";

const client = new MongoClient(process.env.DATABASE_URL);

async function connect(): Promise<ConnectType> {
    //if(!client.isConnected())
    await client.connect();

    const db = client.db('gbs-bolao');
    return { db, client };
}