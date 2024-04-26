import { useEffect, useState } from "react";

type Response = {
  info: {
    count: number;
  };
};

const useCountCharacters = (): { characterCount: number } => {
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    const fetchCharacterCount = async () => {
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character"
        );
        const data: Response = await response.json();
        setCharacterCount(data.info.count);
      } catch (error) {
        console.error("Error fetching character count:", error);
      }
    };

    fetchCharacterCount();
  }, []);

  return { characterCount };
};

const useCountLocations = (): { locationCount: number } => {
  const [locationCount, setLocationCount] = useState(0);

  useEffect(() => {
    const fetchCharacterCount = async () => {
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/location"
        );
        const data: Response = await response.json();
        setLocationCount(data.info.count);
      } catch (error) {
        console.error("Error fetching character count:", error);
      }
    };

    fetchCharacterCount();
  }, []);

  return { locationCount };
};

export { useCountCharacters, useCountLocations };
