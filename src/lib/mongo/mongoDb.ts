import { MongoClient } from "mongodb";

console.log("envirtonment --->", process.env)
if (!process.env.DB_URL) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const URI: string = process.env.DB_URL;
// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).

//   let globalWithMongoClientPromise = global as typeof globalThis & {
//     _mongoClientPromise: Promise<MongoClient>;
//   };

//   if (!globalWithMongoClientPromise._mongoClientPromise) {
//     client = new MongoClient(URI);
//     globalWithMongoClientPromise._mongoClientPromise = client.connect();
//   }
//   clientPromise = globalWithMongoClientPromise._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(URI);
//   clientPromise = client.connect();
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise;

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