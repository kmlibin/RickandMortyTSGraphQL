import React from 'react'
import { useQuery, gql } from "@apollo/client"
import Search from './Search'

import './CharacterList.css'

const GET_CHARACTERS = gql`

query {
  characters {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      status
      gender
      species
      origin {
        name
        dimension
      }
      image
    }
  }
}`

interface ICharacter {
    id: string,
    image: string,
    name: string,
    gender: string,
    species: string,
    origin: {name: string, dimension: string},
    status: string
}
export const CharacterCard = ()=> {
    const { error, data, loading } = useQuery(GET_CHARACTERS)
console.log(data)

  return (
    // <div className="feed-container">
    //   <Search />
    <div className="character-container">
       {data && data.characters.results.map((char:ICharacter) => (
            <div key={char.id} className="character">
                <img src={char.image} />
                <h2>{char.name}</h2>
                <p>species: {char.species}</p>
                <p>gender: {char.gender}</p>
                <p>dimension of origin: {char.origin.name}</p>
                <p>{char.status}</p>
            </div>
            ))
        } 
    </div>
    // </div>
  )
}


