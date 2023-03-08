import { MongoClient } from "mongodb";

if (!process.env.DB_URL) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const URI: string = process.env.DB_URL;

const client = new MongoClient(URI);
const globalWithMongoClientPromise = global as typeof globalThis & {
      _mongoClientPromise: Promise<MongoClient>;
    };

const getClient = () => {
  if (process.env.NODE_ENV !== 'production') {
    if(!globalWithMongoClientPromise._mongoClientPromise)
    globalWithMongoClientPromise._mongoClientPromise = client.connect();

    return globalWithMongoClientPromise._mongoClientPromise;
  }

  return client.connect()
}

const clientPromise = getClient();
export default clientPromise;