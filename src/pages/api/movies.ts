import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mondodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("movieDB"); // або ім'я твоєї бази

  const collection = db.collection("movies"); // колекція для фільмів

  switch (req.method) {
    case "GET":
      const movies = await collection.find({}).toArray();
      res.status(200).json(movies);
      break;

    case "POST":
      const newMovie = req.body;
      const result = await collection.insertOne(newMovie);
      res.status(201).json(result);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
