// pages/api/users.js
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("Testing");        // tu base
    const users = db.collection("Dev");     // tu colección

    switch (req.method) {
      case "GET":
        try {
          const allUsers = await users.find({}).toArray();
          return res.status(200).json(allUsers);
        } catch (err) {
          console.error("❌ Error en GET:", err);
          return res.status(500).json({ error: err.message });
        }

      case "POST":
        try {
          const newUser = req.body;
          if (!newUser || Object.keys(newUser).length === 0) {
            return res.status(400).json({ error: "Body vacío o inválido" });
          }
          const result = await users.insertOne(newUser);
          return res.status(201).json({ _id: result.insertedId, ...newUser });
        } catch (err) {
          console.error("❌ Error en POST:", err);
          return res.status(400).json({ error: err.message });
        }

      case "PUT":
        try {
          const { _id, ...data } = req.body;
          if (!_id) return res.status(400).json({ error: "Falta _id" });

          const result = await users.updateOne(
            { _id: ObjectId.createFromHexString(_id) },
            { $set: data }
          );

          return res.status(200).json({ modifiedCount: result.modifiedCount });
        } catch (err) {
          console.error("❌ Error en PUT:", err);
          return res.status(400).json({ error: err.message });
        }

      case "DELETE":
        try {
          const { _id } = req.body;
          if (!_id) return res.status(400).json({ error: "Falta _id" });

          const result = await users.deleteOne({ _id: ObjectId.createFromHexString(_id) });

          return res.status(200).json({ deletedCount: result.deletedCount });
        } catch (err) {
          console.error("❌ Error en DELETE:", err);
          return res.status(400).json({ error: err.message });
        }

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.error("❌ Error general en handler:", err);
    return res.status(500).json({ error: err.message });
  }
}