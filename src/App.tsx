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
import {Favorites} from "./pages/Favorites"

const App: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  // const [species, setSpecies] = useState<string | null>(null);
  // const [gender, setGender] = useState<string | null>(null);
  // const [status, setStatus] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  //grab and store search params
  const species = searchParams.get('species') ;
  const gender = searchParams.get('gender') ;
  const status = searchParams.get('status') ;

  //create query string object that is ultimately sent to setSearchParams in child components
  let queryString = Object.fromEntries([...searchParams]);
  console.log(queryString)

  const { error, data, loading } = useQuery(GET_CHARACTERS, {
    variables: {
      name: name,
      gender: gender,
      species: species,
      status: status,
    },
  });

  console.log(error, data, loading);
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
            <Search name={name} setName={setName} />
            <Routes>
              <Route path="/" element= {data && <MainFeed data={data} />} />
              <Route path="/favorites" element={<Favorites />}/>
            </Routes>
            
            {/* <CharacterCard data={data} /> */}
          </div>
         
        </div>
      </div>
    
  );
};

export default App;
