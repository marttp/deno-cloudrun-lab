import { MongoClient } from 'https://deno.land/x/mongo@v0.7.0/mod.ts';
// Setup MongoClient
const client = new MongoClient();
client.connectWithUri('Your mongodb url');

export const db = client.database('deno-cloudrun');
