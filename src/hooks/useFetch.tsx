import { useState, useEffect } from "react";
import Character from "types/Character";

interface useFetchCharactersResponse {
  info: {
    next: string;
  };
  results: Character[];
}

const useFetchCharacters = (): {
  characters: Character[];
  loading: boolean;
  error: Error | null;
  fetchMore: () => void;
} => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchCharacters = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${page}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: useFetchCharactersResponse = await response.json();
        if (data.info.next === null || data.results.length === 0) {
          return;
        }
        setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  const fetchMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };
  return { characters, loading, error, fetchMore };
};

export default useFetchCharacters;
