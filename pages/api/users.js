// pages/api/users.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("mi_base");       // nombre de tu base de datos
  const users = db.collection("users");  // colección

  switch (req.method) {
    case "GET":
      const allUsers = await users.find({}).toArray();
      return res.status(200).json(allUsers);

    case "POST":
      try {
        const newUser = req.body;
        const result = await users.insertOne(newUser);
        return res.status(201).json({ _id: result.insertedId, ...newUser });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }

    case "PUT":
      try {
        const { _id, ...data } = req.body;
        const { ObjectId } = require("mongodb");
        const result = await users.updateOne(
          { _id: new ObjectId(_id) },
          { $set: data }
        );
        return res.status(200).json({ modifiedCount: result.modifiedCount });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }

    case "DELETE":
      try {
        const { _id } = req.body;
        const { ObjectId } = require("mongodb");
        const result = await users.deleteOne({ _id: new ObjectId(_id) });
        return res.status(200).json({ deletedCount: result.deletedCount });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
