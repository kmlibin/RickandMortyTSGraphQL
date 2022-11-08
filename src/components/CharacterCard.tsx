import React from 'react'

import './CharacterList.css'


interface ICharacter {
    id?: string,
    image?: string,
    name: string,
    gender: string,
    species: string,
    origin?: {name?: string, dimension?: string},
    status?: string
}

interface Props {
  data: any;
}

export const CharacterCard = ({data}:Props)=> {
    console.log(data.characters)

  return (
  
    <div className="character-container">
       {data && data.data.characters.results.map((char:ICharacter) => (
            <div key={char.id} className="character">
                <img src={char.image} />
                <h2>{char.name}</h2>
                <p>species: {char.species}</p>
                <p>gender: {char.gender}</p>
                <p>dimension of origin: {char.origin?.name}</p>
                <p>{char.status}</p>
            </div>
            ))
        } 
    </div>
  
  )
}


