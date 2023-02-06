import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

//styles
import "../search/search.scss";

interface Props {
  queryString: {
    [k: string]: string;
  };
  name: string;
}

export default function Search({ queryString, name: urlName }: Props) {
  const [queryName, setQueryName] = useState<string>(urlName? urlName : "");
  const [searchParams, setSearchParams] = useSearchParams();

  //submit function for search. NOT FUNCTIONAL WITH FAVORITES TOGGLE
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    if (queryString) {
      e.preventDefault();
      setSearchParams({ ...queryString, ["name"]: queryName });
      setQueryName("");
    }
  };

  //code for clearing search params
  //     for (const key of searchParams.keys()) {
  //       searchParams.delete(key);
  //     }
  //     setSearchParams(searchParams)
  //  }

  return (
    <div className="searchbar-container">
      <div className="search">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            placeholder="Character"
            value={queryName ? queryName : ""}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setQueryName(e.target.value);
            }}
          />
          <i className="fa-solid fa-magnifying-glass"></i> 
          <button className="search-button">Search</button>
        </form>
      
      </div>

      {urlName && (
      <button
        className="clear-search search-button"
        onClick={() => {
          searchParams.delete("name");
          setQueryName("");
          setSearchParams(searchParams);
        }}
      >
        Clear Search
      </button>
      )}
    </div>
  );
}
