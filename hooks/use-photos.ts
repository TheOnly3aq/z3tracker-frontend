import { useState, useEffect } from "react";

export interface Photo {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UsePhotosReturn {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface UsePhotosParams {
  website?: "LexusTracker" | "Z3Radar";
}

export const usePhotos = (params?: UsePhotosParams): UsePhotosReturn => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build URL with optional website query parameter
      const url = new URL("/api/photos", window.location.origin);
      if (params?.website) {
        url.searchParams.set("website", params.website);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Failed to fetch photos: ${response.status}`);
      }

      const data = await response.json();
      setPhotos(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch photos";
      setError(errorMessage);
      console.error("Error fetching photos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.website]);

  return {
    photos,
    loading,
    error,
    refetch: fetchPhotos,
  };
};
