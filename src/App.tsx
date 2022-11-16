import React, { useState, useMemo } from "react";
import {
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";

//Apollo
import { useQuery } from "@apollo/client";

//queries
import { GET_CHARACTERS } from "./resources/gql";

 //TS interfaces
import { ICharacter, Select } from "./resources/model";

//pages and components
import { MainFeed } from "./pages/MainFeed";
import { DropDown } from "./components/DropDown";

//styles
import "./styles/App.scss"

//filters for dropdown menus - store in own file?
const speciesFilter: Select[] = [
  { value: "human", label: "Human" },
  { value: "alien", label: "Alien" },
  { value: "robot", label: "Robot" },
  { value: "humanoid", label: "Humanoid" },
  { value: "cronenberg", label: "Cronenberg" },
  { value: "animal", label: "Animal" },
  { value: "mythological creature", label: "Mythological Creature" },
  { value: "disease", label: "Disease" },
];
const genderFilter: Select[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "genderless", label: "Genderless" },
  { value: "unknown", label: "Unknown" },
];

const statusFilter: Select[] = [
  { value: "alive", label: "Alive" },
  { value: "dead", label: "Dead" },
  { value: "unknown", label: "Unknown" },
];

const App: React.FC = () => {
  // const [name, setName] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | undefined>();
  const [favorites, setFavorites] = useState<ICharacter[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  //grab and store search params
  const species: string | null = searchParams.get("species");
  const gender: string | null = searchParams.get("gender");
  const status: string | null = searchParams.get("status");
  const name: string | null = searchParams.get("name");

  console.log(species, gender, status, name)
  //create query string object that is ultimately sent to setSearchParams in child components
  let queryString: {
    [k: string]: string;
  } = Object.fromEntries([...searchParams]);

  //grab data
  const { error, data, loading } = useQuery(GET_CHARACTERS, {
    variables: {
      page: currentPage,
      name: name,
      gender: gender,
      species: species,
      status: status,
    },
  });

  //calculate total pages with each data load
  useMemo(() => {
    setTotalPages(data?.characters.info.pages);
  }, [data]);

  return (
    <div className="App">
      <div className="hero">
        <div className="title">
          <img src="https://www.freepnglogos.com/uploads/rick-and-morty-png/list-rick-and-morty-episodes-wikipedia-24.png" />
          <p>this is a placeholder for a bit of text</p>
        </div>
      </div>
      <div className="content-container">
        <div className="sidebar">
          <h4>Filter by:</h4>
          <div className="filters">
            <DropDown
              filters={speciesFilter}
              queryString={queryString}
              query={"species"}
              setCurrentPage={setCurrentPage}
            />
            <DropDown
              filters={genderFilter}
              queryString={queryString}
              query={"gender"}
              setCurrentPage={setCurrentPage}
            />
            <DropDown
              filters={statusFilter}
              queryString={queryString}
              query={"status"}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
        
     
          <Routes>
            <Route
              path="/"
              element={
                data && (
                  <MainFeed
                    data={data}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    queryString={queryString}
                  />
                )
              }
            />
          </Routes>
        
      </div>
    </div>
  );
};

export default App;
