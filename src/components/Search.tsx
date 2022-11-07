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

interface Props {

};
// type Props = {
//   handleCharacterFilter: (name: string) => void;
// }

// ({handleCharacterFilter = () => {}}: Props)

export default function Search({}: Props) { 
     const [name, setName] = useState("");   

    console.log(name)

  return (

      <div>
        <input
          value={name}
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {/* <button onClick={handleChange}>Search</button> */}
       
      </div>
    );

}