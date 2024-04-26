import { useState, useEffect } from "react";
import Location from "types/LocationsType";

interface useFetchLocationsResponse {
  info: {
    next: string;
  };
  results: Location[];
}

const useFetchLocations = (): {
  locations: Location[];
  loading: boolean;
  error: Error | null;
  fetchMore: () => void;
} => {
  const [locations, setCharacters] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchLocations = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/location?page=${page}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: useFetchLocationsResponse = await response.json();
        if (data.info.next === null) {
          return;
        }
        setCharacters((prevLocations) => [...prevLocations, ...data.results]);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchLocations();
  }, [page]);

  const fetchMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };
  return { locations, loading, error, fetchMore };
};

export default useFetchLocations;
