import React, { useState, useMemo } from "react";
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
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number|undefined>()
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
      page: currentPage,
      name: name,
      gender: gender,
      species: species,
      status: status,
    },
  });

  // console.log(data.characters.info.count)
useMemo(() => {
   setTotalPages(data?.characters.info.count)
}, [data])

console.log(totalPages)
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
console.log(data)
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
            <Route path="/" element={data && <MainFeed data={data} favorites={favorites} setFavorites={setFavorites} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
