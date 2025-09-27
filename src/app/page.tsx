"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import { NormalizedItem } from "../app/types";
import Image from "next/image";

export default function Home() {
  const [movies, setMovies] = useState<NormalizedItem[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/movies");
      const data = await res.json();
      setMovies(data); // зберігаємо у стан
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        {movies.length === 0 ? (
          <p className="text-center text-gray-500">No movies yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {movies.map((movie) => (
              <div key={movie.id} className="border rounded-lg p-2 shadow">
                {movie.poster && (
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={92}
                    height={138}
                    className="w-full h-48 object-cover rounded"
                  />
                )}
                <h2 className="font-bold mt-2">{movie.title}</h2>
                <p className="text-sm text-gray-500">
                  {movie.release_date?.slice(0, 4)}
                </p>
                {movie.rating && <p>Rating: {movie.rating}</p>}
                {movie.review && <p className="text-sm">{movie.review}</p>}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
