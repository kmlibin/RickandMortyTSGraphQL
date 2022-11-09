import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";



interface Props {
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  // handleClear: () => void;
};

export default function Sidebar({name, setName}: Props) {
  const [queryName, setQueryName] = useState<string | null>("");
  const [searchParams, setSearchParams] = useSearchParams()

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(queryName)
  }

  const handleClick = () => {
    setName(null)
    // handleClear()
    
    for (const key of searchParams.keys()) {
      searchParams.delete(key);
    }
    setSearchParams(searchParams)
 
 }
  console.log()
  return (
    <div>
      <form onSubmit = {(e) => handleSubmit(e)}>
      <input
        placeholder="Search by Character"
        value= {queryName? queryName : ""}
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setQueryName(e.target.value);
        }}
      />
      <button>Search</button>
      </form>
      <button onClick={handleClick}>All Characters</button>
    </div>
  );
}
