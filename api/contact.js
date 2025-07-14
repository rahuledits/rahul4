import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let cachedClient = null;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    if (!cachedClient) {
      cachedClient = new MongoClient(uri);
      await cachedClient.connect();
    }
    const db = cachedClient.db("portfolio");
    const collection = db.collection("contacts");
    await collection.insertOne({ ...req.body, date: new Date() });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save message" });
  }
} 