import React, { useState } from "react";

import "./CharacterList.css";
import { ICharacter } from "../model";
import Pagination from "./Pagination";

// interface ICharacter {
//     id?: string,
//     image?: string,
//     name: string,
//     gender: string,
//     species: string,
//     origin?: {name?: string, dimension?: string},
//     status?: string
// }

interface Props {
  data: any;
  favorites: ICharacter[];
  setFavorites: React.Dispatch<React.SetStateAction<ICharacter[]>>;
  currentPage: Number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: Number | undefined;
}
//check out isFavorite boolean
export const CharacterCard = ({ data, favorites, setFavorites, currentPage, setCurrentPage, totalPages }: Props) => {
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [clicked, setClicked] = useState<any>([]);

  const handleFillHeart = (id: string | undefined) => {
    if(clicked.includes(id)) {
      return
    }
    setClicked([...clicked, id]);
  };

  const handleRemoveFillHeart = (id: string | undefined) => {
    setClicked((prev: string[]) => prev.filter((el: string) => el !== id));
  };

  //move handleadd/delete to parent component
  const handleDeleteFavorite = (id: string | undefined) => {
    const newList = favorites.filter((char) => char.id !== id);
    setFavorites(newList);
  };

  const handleAddFavorite = (char: ICharacter) => {
    if(favorites.includes(char)) {
      return
    }
    setFavorites([
      ...favorites,
      {
        id: char.id,
        image: char.image,
        name: char.name,
        gender: char.gender,
        species: char.species,
        origin: char.origin,
        status: char.status,
        isFavorite: true,
      },
    ])
  }

  console.log(favorites);

  if (!showFavorites) {

    //for regular data page

    return (
      <div className="character-container">
        <div className="button-container">
          <button onClick={() => setShowFavorites(true)}>Favorites</button>
        </div>
        {data &&
          data.characters.results.map((char: ICharacter) => (
            <div key={char.id} className="character">
              <div className="img-container">
                <img src={char.image} />
                <div className="status-container">
                  {clicked?.includes(char.id) ? (
                    <i
                      className="fa-solid fill fa-heart"
                      onClick={() => {
                        handleRemoveFillHeart(char.id);
                        handleDeleteFavorite(char.id);
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa-regular fa-heart"
                      onClick={() => {
                        handleFillHeart(char.id);
                        handleAddFavorite(char)
                      }}
                    ></i>
                  )}

                  <p
                    className={
                      char.status === "Alive"
                        ? "alive"
                        : char.status === "Dead"
                        ? "dead"
                        : "unknown"
                    }
                  >
                    {char.status}
                  </p>
                </div>
              </div>
              <h2>{char.name}</h2>
              <p>species: {char.species}</p>
              <p>gender: {char.gender}</p>
              <p>dimension of origin: {char.origin?.name}</p>
            </div>
          ))}
          {data && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>}
      </div>
    );
  }

  //for favorites page
  return (
    <div className="character-container">
      <div className="button-container">
        <button onClick={() => setShowFavorites(false)}>All Characters</button>
      </div>
      {favorites &&
        favorites.map((char) => (
          <div key={char.id} className="character">
            <div className="img-container">
              <img src={char.image} />
              <div className="status-container">
                {clicked?.includes(char.id) ? (
                  <i
                    className="fa-solid fill fa-heart"
                    onClick={() => {
                      handleRemoveFillHeart(char.id);
                      handleDeleteFavorite(char.id);
                    }}
                  ></i>
                ) : (
                  <i
                    className="fa-regular fa-heart"
                    onClick={() => {
                      handleFillHeart(char.id);
                      handleAddFavorite(char)
                    }}
                  ></i>
                )}

                <p
                  className={
                    char.status === "Alive"
                      ? "alive"
                      : char.status === "Dead"
                      ? "dead"
                      : "unknown"
                  }
                >
                  {char.status}
                </p>
              </div>
            </div>
            <h2>{char.name}</h2>
            <p>species: {char.species}</p>
            <p>gender: {char.gender}</p>
            <p>dimension of origin: {char.origin?.name}</p>
          </div>
        ))}
    </div>
  );
};
