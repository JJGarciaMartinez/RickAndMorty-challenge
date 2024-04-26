import React from "react";
import { Heart } from "@phosphor-icons/react";

interface Props {
  isFavorite: boolean;
  onAddToFavorites: () => void;
  onRemoveFromFavorites: () => void;
}

const FavoritesButton: React.FC<Props> = ({
  isFavorite,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  const buttonText = isFavorite ? (
    <span>
      <p>Favorites added</p>
      <Heart size={22} weight="fill" color="red" />
    </span>
  ) : (
    <span>
      <p>Add to favorites</p>
      <Heart size={22} color="red" />
    </span>
  );

  return (
    <button onClick={isFavorite ? onRemoveFromFavorites : onAddToFavorites}>
      {buttonText}
    </button>
  );
};

export default FavoritesButton;
