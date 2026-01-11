import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mondodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("movieDB");
    const collection = db.collection("movies");
    
    const movies = await collection.find({}).toArray();
    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("movieDB");
    const collection = db.collection("movies");
    
    const newMovie = await request.json();
    
   // validation if title and id are required
    if (!newMovie.title || !newMovie.id) {
      return NextResponse.json(
        { error: "Title and ID are required" },
        { status: 400 }
      );
    }
    
    // If validation passed - save the movie
    const result = await collection.insertOne(newMovie);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error adding movie:", error);
    return NextResponse.json(
      { error: "Failed to add movie" },
      { status: 500 }
    );
  }
}

