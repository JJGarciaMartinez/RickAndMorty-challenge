import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useFetchCharacters from "hooks/useFetch";
import useFavorites from "hooks/useFavorites";
import useObserver from "hooks/useObserver";
import { useCountCharacters } from "hooks/useCounters";
import FavoritesButton from "components/Buttons/FavoritesButton";
import Character from "types/Character";
import style from "pages/styles/Home.module.css";

const CharactersList: React.FC = () => {
  const { characterCount } = useCountCharacters();
  const { characters, loading, error, fetchMore } = useFetchCharacters();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { lastElementRef } = useObserver(fetchMore, loading);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectLogin, setRedirectLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAddToFavorites = useCallback(
    (character: Character) => {
      if (!isLoggedIn) {
        setRedirectLogin(true);
      } else {
        if (favorites.some((fav) => fav.id === character.id)) {
          removeFromFavorites(character.id);
        } else {
          addToFavorites(character);
        }
      }
    },
    [isLoggedIn, favorites, addToFavorites, removeFromFavorites]
  );

  useEffect(() => {
    if (redirectLogin) {
      navigate("/login");
    }
  }, [redirectLogin, navigate]);

  const renderFavoritesButton = (character: Character) => {
    const isFavorite = favorites.some((fav) => fav.id === character.id);

    return (
      <FavoritesButton
        isFavorite={isFavorite}
        onAddToFavorites={() => handleAddToFavorites(character)}
        onRemoveFromFavorites={() => removeFromFavorites(character.id)}
      />
    );
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={style.container}>
      <header>
        <h2>Rick and Morty Characters</h2>
        <p>Characters found: {characterCount}</p>
      </header>
      <ul>
        {characters.map((character, index) => (
          <li
            key={index}
            ref={index === characters.length - 1 ? lastElementRef : null}
          >
            <figure>
              <img src={character.image} alt={character.name} />

              <span className={style.info}>
                <p>Status: {character.status}</p>
                <p>Origin: {character.origin.name}</p>
                <p>Species: {character.species}</p>
                <p>Gender: {character.gender}</p>
                <p>Episodes: {character.episode.length}</p>

                {renderFavoritesButton(character)}
              </span>
            </figure>
            <p>{character.name}</p>
          </li>
        ))}
      </ul>
      {characters.length === 0 && (
        <div className={style.loader}>Cargando...</div>
      )}
    </div>
  );
};

export default CharactersList;
