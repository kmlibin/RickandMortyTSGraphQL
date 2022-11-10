import React from 'react'
import { CharacterCard } from '../components/CharacterCard';
import {ICharacter} from '../model'


interface Props {
  favorites: ICharacter[];
  setFavorites: React.Dispatch<React.SetStateAction<ICharacter[]>>
}

export const Favorites = ({favorites, setFavorites}: Props) => {
 console.log(favorites)

 localStorage.setItem('Key', 'Value')
    return (
      
     <div>"favorites"

      {favorites && 
        favorites.map(char => (
          <div key={char.id} className="character">
            <div className="img-container">
              <img src={char.image} />
              <div className="status-container">
                <i
                  className="fa-regular fa-heart"
                  onClick={(e) => setFavorites([...favorites, char])}
            
                ></i>
                <p>{char.status}</p>
              </div>
            </div>
            <h2>{char.name}</h2>
            <p>species: {char.species}</p>
            <p>gender: {char.gender}</p>
            <p>dimension of origin: {char.origin?.name}</p>
          </div>
        )
      )}
     </div>
    )
  }
  


