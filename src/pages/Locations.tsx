import React from "react";
import { useCountLocations } from "hooks/useCounters";
import useFetchCharacters from "hooks/useLocations";
import useObserver from "hooks/useObserver";
import style from "pages/styles/Locations.module.css";
import { CaretDown } from "@phosphor-icons/react";

const LocationsList: React.FC = () => {
  const { locationCount } = useCountLocations();
  const { locations, loading, error, fetchMore } = useFetchCharacters();
  const { lastElementRef } = useObserver(fetchMore, loading);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={style.container}>
      <header>
        <h2>Rick and Morty Locations</h2>
        <p className={style.locationCount}>
          Cantidad de Locations: {locationCount}
        </p>
      </header>
      <ul>
        {locations.map((location, index) => (
          <li
            key={index}
            ref={index === locations.length - 1 ? lastElementRef : null}
          >
            <p>Location: {location.name}</p>
            <details>
              <summary>
                Details <CaretDown size={20} className={style.icon} />
              </summary>
              <span className={style.details}>
                <p>Dimension: {location.dimension}</p>
                <p>Type: {location.type}</p>
                <p>Residets: {location.residents.length}</p>
              </span>
            </details>
          </li>
        ))}
      </ul>
      {locations.length === 0 && (
        <div className={style.loader}>Cargando...</div>
      )}
    </div>
  );
};

export default LocationsList;
