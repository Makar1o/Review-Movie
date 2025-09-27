export type TMDBItem = {
  id: number;
  media_type?: "movie" | "tv" | "person" | string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path?: string | null;
};

export interface NormalizedItem {
  id: number;
  media_type?: string;
  title: string;
  release_date?: string | null;
  poster?: string | null;
  rating?: number;
  review?: string;
}

export interface Movie {
  id: number;
  title: string;
  media_type: string;
  release_date?: string | null;
  poster?: string | null;
  rating?: number;
  review?: string;
}
