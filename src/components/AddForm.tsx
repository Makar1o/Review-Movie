"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface Movie {
  id: number;
  title: string;
  release_date?: string;
}

export const AddForm = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const API_KEY = "fab42da6d1baf4546c35c00a1e952e39";
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  const { isLoading, error, data } = useQuery<{ results: Movie[] }>({
    queryKey: ["getmovie", debouncedQuery],
    queryFn: async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      return res.json();
    },
    enabled: !!debouncedQuery,
  });

  useEffect(() => {
    if (data?.results) {
      setResults(data.results);
    }
  }, [data]);

  const handleSelect = (movie: Movie) => {
    setQuery(movie.title);
    setResults([]);
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message} </p>;

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Add New Movie
          </h1>
          <p className="text-gray-600">
            Fill out the form to add a movie to your collection
          </p>
        </div>

        <form className="bg-white rounded-2xl border border-gray-200 p-8 space-y-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#2C275F]">
                Movie Title *
              </label>
              <input
                type="text"
                placeholder="e.g., Inception"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2C275F] focus:border-[#2C275F] outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 hover:border-gray-400"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onSubmit={(e) => e?.preventDefault}
              />
              {results.length > 0 && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10 max-h-60 overflow-y-auto">
                  {results.map((movie) => (
                    <div
                      key={movie.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelect(movie)}
                    >
                      {movie.title} ({movie.release_date?.slice(0, 4) || "N/A"})
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#2C275F]">
                Your Rating
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                placeholder="0 - 10"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2C275F] focus:border-[#2C275F] outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 hover:border-gray-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#2C275F]">
              Review
            </label>
            <textarea
              placeholder="Write a short review..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2C275F] focus:border-[#2C275F] outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none hover:border-gray-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-[#2C275F] hover:bg-[#2C275F]-hover text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              Add Movie
            </button>

            <button
              type="button"
              className="px-8 py-4 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
