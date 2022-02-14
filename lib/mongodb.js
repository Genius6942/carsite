import { MongoClient } from 'mongodb';

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  );
}

// set MongoClient options
const options = {};

let client;
let db;

// establishes connection to specified database
async function connectToDatabase() {
  if (!client || !db) {
    client = await MongoClient.connect(MONGODB_URI, options);
    db = client.db(MONGODB_DB);
  }
}

// returns an object containing the requested collection from MONGODB_DB
export async function getCollection(collection, find = {}, projection = {}, limit) {
  await connectToDatabase();
  const data = typeof limit === 'number' ? await db
    .collection(collection)
    .find(find)
    .project(projection)
    .limit(limit)
    .toArray() : await db
    .collection(collection)
    .find({})
    .project(projection)
    .toArray();
  return JSON.parse(JSON.stringify(data));
}