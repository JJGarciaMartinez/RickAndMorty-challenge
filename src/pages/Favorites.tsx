import React from "react";
import useFavorites from "hooks/useFavorites";
import style from "pages/styles/Favorites.module.css";
import { Heart, X } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const FavoritesList: React.FC = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  const loggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div className={style.container}>
      <header>
        <h2>
          Favorites List <Heart size={32} color="red" />
        </h2>
        <p>Favorites count: {favorites.length}</p>
      </header>

      {loggedIn ? (
        favorites.length > 0 ? (
          <ul>
            {favorites.map((character) => (
              <li key={character.id}>
                <figure>
                  <img src={character.image} alt={character.name} />

                  <span className={style.info}>
                    <p>Status: {character.status}</p>
                    <p>Origin: {character.origin.name}</p>
                    <p>Species: {character.species}</p>
                    <p>Gender: {character.gender}</p>
                    <p>Episodes: {character.episode.length}</p>

                    <button onClick={() => removeFromFavorites(character.id)}>
                      <span>
                        <p>Remove</p>
                        <X size={22} color="red" weight="bold" />
                      </span>
                    </button>
                  </span>
                </figure>
                <p>{character.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className={style.noFavorites}>
            <p>Favorites is empty</p>
          </div>
        )
      ) : (
        <div className={style.noLogin}>
          <Link to="/login">Login</Link>
          <p>to see your favorites...</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
