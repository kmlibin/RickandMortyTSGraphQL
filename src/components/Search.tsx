import React, {useState} from 'react'
import {useLazyQuery, gql} from '@apollo/client'


const GET_FILTERED_CHARACTER = gql `
  query filterByCharacter($name: String!) {
  characters(filter: {name: $name}) {
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
}
`;
type Props = {}

export default function Search({}: Props) { 
     const [name, setName] = useState("");   
     const [filteredCharacter, { loading, error, data, called }] = useLazyQuery(
      GET_FILTERED_CHARACTER,
      {
        variables: { name },
      }
    );
    console.log(name)
    console.log(data)
  return (


      <div>
        <input
          value={name}
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button onClick={() =>filteredCharacter()}>Search</button>
        {data && 'data'}
      </div>
    );

}