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

export const usePhotos = (): UsePhotosReturn => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/photos");
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
  }, []);

  return {
    photos,
    loading,
    error,
    refetch: fetchPhotos,
  };
};
