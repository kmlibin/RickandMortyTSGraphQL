import React, {useState} from 'react'

type Props = {}

export default function Search({}: Props) { 
     const [query, setQuery] = useState("");
  return (
  
    // //first is a functino we invoke to execute query, second is an object with loading, error, data. also get "called", which just checks if the func has ever been called. bool.
    // const [getLocations, { loading, error, data, called }] = useLazyQuery(
    //   GET_CHARACTER_LOCATIONS,
    //   {
    //     variables: { name },
    //   }
    // );
 
      <div>
        <input
          value={query}
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button>Search</button>

      </div>
    );

}