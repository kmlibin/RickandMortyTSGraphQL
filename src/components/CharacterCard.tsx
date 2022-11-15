import React, { useState } from "react";

// TS interfaces
import { ICharacter } from "../model";

//components
import Pagination from "./Pagination";
import Search from "./Search";

//styles
import "./CharacterList.css";

interface Props {
  data: any;
  favorites: ICharacter[];
  setFavorites: React.Dispatch<React.SetStateAction<ICharacter[]>>;
  currentPage: Number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: Number | undefined;
  queryString: {
    [k: string]: string;
  };
}

export const CharacterCard = ({
  data,
  favorites,
  setFavorites,
  currentPage,
  setCurrentPage,
  totalPages,
  queryString,
}: Props) => {
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [clicked, setClicked] = useState<any>([]);

  //once user clicks a heart, it adds character to list of other clicked hearts. set to conditionally render filled in heart
  const handleFillHeart = (id: string | undefined): void => {
    if (clicked.includes(id)) {
      return;
    }
    setClicked([...clicked, id]);
  };

  //gets rid of filled in heart
  const handleRemoveFillHeart = (id: string | undefined): void => {
    setClicked((prev: string[]) => prev.filter((el: string) => el !== id));
  };

  //deletes favorite from list
  const handleDeleteFavorite = (id: string | undefined) :void  => {
    const newList: ICharacter[] = favorites.filter((char) => char.id !== id);
    setFavorites(newList);
  };

  //add character to list of favorites
  const handleAddFavorite = (char: ICharacter): void => {
    if (favorites.includes(char)) {
      return;
    }
    const newList: ICharacter[] = [
      ...favorites,
      {
        id: char.id,
        image: char.image,
        name: char.name,
        gender: char.gender,
        species: char.species,
        origin: char.origin,
        status: char.status,
      },
    ];
    setFavorites(newList);
  };

  if (!showFavorites) {
    //for regular data page

    return (
      <div className="feed-container">
        <Search queryString={queryString} />
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
                      //decides which heart to show, filled or blank?
                      <i
                        className="fa-regular fa-heart"
                        onClick={() => {
                          handleFillHeart(char.id);
                          handleAddFavorite(char);
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
        {data && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    );
  }

  //this next section is for favorites page. ideal to have it as a conditional render? no. but I didn't think about whether I could POST,
  //and I don't want to store in local storage in case someone favs a huge amount. I could limit it to a top 8, like mySpace...
  //rendering this way also means I don't have pagination or search right off the bat. It makes those reusable components
  //a bit moot.

  return (
    <div className="character-container">
      <div className="button-container">
        <button onClick={() => setShowFavorites(false)}>All Characters</button>
      </div>
      {/* //no favorites? add "nothing to see" */}
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
                      handleAddFavorite(char);
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
