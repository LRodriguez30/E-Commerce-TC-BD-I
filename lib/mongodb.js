import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
let client;
let clientPromise;

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI no definido en .env.local");
}

if (process.env.NODE_ENV === "development") {
  // En desarrollo, usa variable global para no crear multiples conexiones
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción, crear normalmente
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;