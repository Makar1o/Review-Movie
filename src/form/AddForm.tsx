"use client";
import { useState } from "react";
import { NormalizedItem } from "../app/types";
import { SearchInput } from "./SearchInput";
import { RatingInput } from "./RatingInput";
import { ReviewInput } from "./ReviewInput";
import { AddFormButtons } from "./AddFormButtons";

export const AddForm = () => {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<NormalizedItem | null>(
    null
  );
  const [rating, setRating] = useState<number | "">("");
  const [review, setReview] = useState("");

  const handleSelect = (item: NormalizedItem) => {
    setSelectedMovie(item);
    setQuery(item.title);
  };

  const handleAdd = async () => {
    if (!selectedMovie) return;

    try {
      const movieData = {
        ...selectedMovie, // title, media_type, release_date, poster
        rating,
        review,
      };

      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      });

      if (!res.ok) throw new Error("Failed to add movie");

      // Очистка форми після додавання
      setQuery("");
      setSelectedMovie(null);
      setRating("");
      setReview("");

      alert("Movie added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding movie");
    }
  };

  const handleClear = () => {
    setQuery("");
    setSelectedMovie(null);
    setRating("");
    setReview("");
  };

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
        <form className="bg-white rounded-2xl border border-gray-200 p-8 space-y-8 shadow-xl relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <SearchInput
                query={query}
                setQuery={setQuery}
                onSelect={handleSelect}
              />
            </div>
            <RatingInput value={rating} onChange={setRating} />
          </div>
          <ReviewInput value={review} onChange={setReview} />
          <AddFormButtons onAdd={handleAdd} onClear={handleClear} />
        </form>
      </div>
    </div>
  );
};
