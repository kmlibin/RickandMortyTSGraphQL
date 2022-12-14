import React, { useState } from "react";

// TS interfaces
import { ICharacter } from "../../models/model";

//components
import Pagination from "../pagination/Pagination";
import Search from "../search/Search";
import NothingToSee from "../nothingtosee/NothingToSee";

//styles
import "../charactercard/charactercard.scss"


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
  name: string;
}

export const CharacterCard = ({
  data,
  favorites,
  setFavorites,
  currentPage,
  setCurrentPage,
  totalPages,
  queryString,
  name,
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
  const handleDeleteFavorite = (id: string | undefined): void => {
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
        <Search queryString={queryString} name={name} />
        <div className="character-container">
          <div className="button-container">
            <button
              className="favorites"
              onClick={() => setShowFavorites(true)}
            >
              View Favorites
            </button>
          </div>
          {data &&
            data.characters.results.map((char: ICharacter) => (
              <div key={char.id} className="character">
                <div className="img-container">
                  <img alt="character" src={char.image} />
                  <div className="status-container">
                    <p
                      className={
                        char.status === "Alive"
                          ? "alive"
                          : char.status === "Dead"
                          ? "dead"
                          : "unknown"
                      }
                    >
                      {char.status === "Alive"
                        ? "A"
                        : char.status === "Dead"
                        ? "D"
                        : "U"}
                    </p>
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
                        className="fa-regular  fa-heart"
                        onClick={() => {
                          handleFillHeart(char.id);
                          handleAddFavorite(char);
                        }}
                      ></i>
                    )}
                  </div>
                </div>
                <h2>{char.name}</h2>
                <p className="color-one">
                  <span className="tag">Species:</span> {char.species}
                </p>
                <p className="color-two">
                  <span className="tag">Gender:</span> {char.gender}
                </p>
                <p className="color-three">
                  <span className="tag">Dimension:</span> {char.origin?.name}
                </p>
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
    <div className="favorites-container">
      
        <button className="all" onClick={() => setShowFavorites(false)}>
          All Characters
        </button>
        <p>*filters do not work in favorites list</p>
      </div>
      
     {favorites.length < 1 && 
      <NothingToSee text="add some favorites!"/>
     } 
      
      {favorites &&
        favorites.map((char) => (
          <div key={char.id} className="character">
            <div className="img-container">
              <img src={char.image} />
              <div className="status-container">
                <p
                  className={
                    char.status === "Alive"
                      ? "alive"
                      : char.status === "Dead"
                      ? "dead"
                      : "unknown"
                  }
                >
                  {char.status === "Alive"
                    ? "A"
                    : char.status === "Dead"
                    ? "D"
                    : "U"}
                </p>
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
              </div>
            </div>
            <h2>{char.name}</h2>
            <p className="color-one">
              <span className="tag">Species:</span> {char.species}
            </p>
            <p className="color-two">
              <span className="tag">Gender:</span> {char.gender}
            </p>
            <p className="color-three">
              <span className="tag">Dimension:</span>
              {char.origin?.name}
            </p>
          </div>
        ))}
    </div>
  );
};
