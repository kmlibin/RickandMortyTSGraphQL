import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";


//styles
import "../styles/search.scss";

interface Props {
  queryString: {
    [k: string]: string;
  };
}

export default function Search({ queryString }: Props) {
  const [queryName, setQueryName] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  //submit function for search. NOT FUNCTIONAL WITH FAVORITES TOGGLE
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) : void => {
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
    <div className="search">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder="Search by Character"
          value={queryName ? queryName : ""}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQueryName(e.target.value);
          }}
        />
        <button>Search</button>
      </form>
      <button
        onClick={() => {
          searchParams.delete("name");
          setSearchParams(searchParams);
        }}
      >
        Clear Search
      </button>
    </div>
  );
}
