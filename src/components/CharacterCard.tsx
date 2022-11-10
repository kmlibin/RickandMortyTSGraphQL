import React from "react";

import "./CharacterList.css";
import { ICharacter } from "../model";

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
}

export const CharacterCard = ({ data, favorites, setFavorites }: Props) => {
  console.log(favorites);

  // const addFavorite = (e, char) => {
  //   e.preventDefault();
  //   setFavorites([...favorites, char]);
    
  //   }
  // };

  // const handleDelete = (id) => {
  //   const newFavorites = favorites.filter((char) => char !== char.id);
  //   setFavorites(newFavorites);
  // };

  return (
    <div className="character-container">
      {data &&
        data.characters.results.map((char: ICharacter) => (
          <div key={char.id} className="character">
            <div className="img-container">
              <img src={char.image} />
              <div className="status-container">
                {/* <i
                  className="fa-regular fa-heart"
                  onClick={(e) => setFavorites([...favorites, char])}
            
                ></i> */}
                <p className={(char.status === 'Alive'? 'alive': ( char.status === 'Dead' ? 'dead': 'unknown'))}>{char.status}</p>
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
