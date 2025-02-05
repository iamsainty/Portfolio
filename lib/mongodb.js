import { MongoClient } from "mongodb";

const mongoURI = process.env.MONGODB_URI;

let client;

export async function connectToMongo() {
  if (client) {
    return client.db();
  }
  try {
    client = new MongoClient(mongoURI);
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
