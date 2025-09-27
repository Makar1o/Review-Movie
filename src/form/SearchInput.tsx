"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { API_KEY } from "../constants";
import { NormalizedItem, TMDBItem } from "../app/types";

interface SearchInputProps {
  query: string;
  setQuery: (value: string) => void;
  onSelect: (item: NormalizedItem) => void;
}

export const SearchInput = ({
  query,
  setQuery,
  onSelect,
}: SearchInputProps) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [selectedItem, setSelectedItem] = useState<NormalizedItem | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 350);
    return () => clearTimeout(t);
  }, [query]);

  const { data, isLoading, error } = useQuery<{ results: TMDBItem[] }, Error>({
    queryKey: ["search-multi", debouncedQuery],
    queryFn: async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
          debouncedQuery
        )}`
      );
      if (!res.ok) throw new Error("Failed to fetch from TMDB");
      return res.json();
    },
    enabled: !!debouncedQuery, // тільки коли є текст
    staleTime: 1000 * 60,
  });

  const normalized: NormalizedItem[] =
    data?.results
      ?.filter((it) => it.media_type === "movie" || it.media_type === "tv")
      .map((it) => ({
        id: it.id,
        media_type: it.media_type,
        title: it.title ?? it.name ?? "Untitled",
        release_date: it.release_date ?? it.first_air_date ?? null,
        poster: it.poster_path
          ? `https://image.tmdb.org/t/p/w92${it.poster_path}`
          : null,
      })) ?? [];

  // 6️⃣ Вибір фільму з dropdown
  const handleSelect = (item: NormalizedItem) => {
    setSelectedItem(item);
    setQuery("");
    onSelect(item);
  };

  const handleClear = () => setSelectedItem(null);

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-[#2C275F] mb-1">
        Movie Title *
      </label>

      {selectedItem ? (
        <div className="flex items-center gap-3 border rounded-lg p-2">
          {selectedItem.poster && (
            <Image
              src={selectedItem.poster}
              alt={selectedItem.title}
              width={40}
              height={60}
              className="object-cover rounded"
            />
          )}
          <div className="flex-1">
            <p className="font-medium">{selectedItem.title}</p>
            <p className="text-sm text-gray-500">
              {selectedItem.release_date?.slice(0, 4)}
            </p>
          </div>
          <button
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600 ml-8"
          >
            ✕
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="e.g., Inception"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2C275F] focus:border-[#2C275F] outline-none text-gray-900 placeholder-gray-400 hover:border-gray-400"
          />

          {query && normalized.length > 0 && (
            <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10 max-h-60 overflow-y-auto">
              {normalized.map((item) => (
                <div
                  key={`${item.media_type}-${item.id}`}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(item)}
                >
                  {item.poster ? (
                    <Image
                      src={item.poster}
                      alt={item.title}
                      width={40}
                      height={60}
                      className="w-10 h-14 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-14 bg-gray-200 rounded" />
                  )}
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      {item.release_date?.slice(0, 4)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {query && normalized.length === 0 && (
            <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10 p-2 text-gray-500 text-center">
              No results found
            </div>
          )}
        </>
      )}

      {isLoading && query && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10 p-2 text-gray-500 text-center">
          Loading..
        </div>
      )}

      {error && (
        <div className="text-sm text-red-500">Error: {error.message}</div>
      )}
    </div>
  );
};
