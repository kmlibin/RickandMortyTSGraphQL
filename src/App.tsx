import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import "./App.css";
import { CharacterCard } from "./components/CharacterCard";
import Search from "./components/Search";
import Sidebar from "./components/Sidebar";

import { CHECK } from "./gql";

const App: React.FC = () => {
  const [name, setName] = useState(null);
  const [species, setSpecies] = useState(null);
  const [gender, setGender] = useState(null);
  const [status, setStatus] = useState(null)

  const { error, data, loading } = useQuery(CHECK, {
    variables: {
      name: name,
      gender: gender,
      species: species,
      status: status
    },
  });

  console.log(data);
//need to set up variables to control state in filter/search components
  return (
    <div className="App">
      <div className="hero">
        <div className="title">
          <img src="https://www.freepnglogos.com/uploads/rick-and-morty-png/list-rick-and-morty-episodes-wikipedia-24.png" />
          <p>this is a placeholder for a bit of text</p>
        </div>
      </div>
      <div className="content-container">
        <Sidebar />
        <div className="feed-container">
          <Search />
          <CharacterCard data={data} />
        </div>
      </div>
    </div>
  );
};

export default App;
