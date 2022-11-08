import React, { useState } from "react";



interface Props {
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Search({ name, setName }: Props) {
  const [queryName, setQueryName] = useState<string | null>("");

  console.log(queryName, name);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(queryName)
    
  }

  const handleClick = () => {
    setName(null)
  }
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
      <button onClick= {handleClick}>All Characters</button>
    </div>
  );
}
