import { useState, useEffect } from "react";
import Character from "types/Character";

const useFavorites = (): {
  favorites: Character[];
  addToFavorites: (character: Character) => void;
  removeFromFavorites: (characterId: number) => void;
} => {
  const [favorites, setFavorites] = useState<Character[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addToFavorites = (character: Character): void => {
    const updatedFavorites = [...favorites, character];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (characterId: number): void => {
    const updatedFavorites = favorites.filter(
      (character) => character.id !== characterId
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return { favorites, addToFavorites, removeFromFavorites };
};

export default useFavorites;
