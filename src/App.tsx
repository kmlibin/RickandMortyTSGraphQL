import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";

import "./App.css";
import { CharacterCard } from "./components/CharacterCard";
import Search from "./components/Search";
import Sidebar from "./components/Sidebar";

import { GET_CHARACTERS } from "./gql";
import { MainFeed } from "./pages/MainFeed";
import { Favorites } from "./pages/Favorites";
import { ICharacter } from "./model";

const App: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<ICharacter[]>([])

  const [searchParams, setSearchParams] = useSearchParams();

  //grab and store search params
  const species: string | null = searchParams.get("species");
  const gender: string | null = searchParams.get("gender");
  const status: string | null = searchParams.get("status");

  //create query string object that is ultimately sent to setSearchParams in child components
  let queryString: {
    [k: string]: string;
  } = Object.fromEntries([...searchParams]);


  const { error, data, loading } = useQuery(GET_CHARACTERS, {
    variables: {
      name: name,
      gender: gender,
      species: species,
      status: status,
    },
  });

  // const handleClear = (): void => {
  //   setName("");
  //   species = null;
  //   gender = null;
  //   status = null;
  // };

  // const handleAdd = (e: React.FormEvent) => {
  //   e.preventDefault();
  
  //     setFavorites([...favorites,  {id:} ]);

   
  // };

  return (
    <div className="App">
      <div className="hero">
        <div className="title">
          <img src="https://www.freepnglogos.com/uploads/rick-and-morty-png/list-rick-and-morty-episodes-wikipedia-24.png" />
          <p>this is a placeholder for a bit of text</p>
        </div>
      </div>
      <div className="content-container">
        <Sidebar queryString={queryString} />
        <div className="feed-container">
          <Search name={name} setName={setName}/>
          <Routes>
            <Route path="/" element={data && <MainFeed data={data} favorites={favorites} setFavorites={setFavorites}/>} />
            <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
