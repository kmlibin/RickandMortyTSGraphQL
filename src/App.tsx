import React, { useState, useMemo, useEffect } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";

//Apollo
import { useQuery } from "@apollo/client";

//api queries
import { GET_CHARACTERS } from "./api/gql";

//TS interfaces
import { ICharacter, ISelect } from "./models/model";

//pages and components
import { MainFeed } from "./pages/mainfeed/MainFeed";
import { DropDown } from "./components/dropdown/DropDown";
import NothingToSee from "./components/nothingtosee/NothingToSee";
import { Header } from "./components/header/Header";

//styles & AOS init
import "./App.scss";
import Aos from "aos";
import "aos/dist/aos.css";

//filters for dropdown menus - store in own file?
const speciesFilter: ISelect[] = [
  { value: "human", label: "Human" },
  { value: "alien", label: "Alien" },
  { value: "robot", label: "Robot" },
  { value: "humanoid", label: "Humanoid" },
  { value: "cronenberg", label: "Cronenberg" },
  { value: "animal", label: "Animal" },
  { value: "mythological creature", label: "Mythological Creature" },
  { value: "disease", label: "Disease" },
];
const genderFilter: ISelect[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "genderless", label: "Genderless" },
  { value: "unknown", label: "Unknown" },
];

const statusFilter: ISelect[] = [
  { value: "alive", label: "Alive" },
  { value: "dead", label: "Dead" },
  { value: "unknown", label: "Unknown" },
];

const App: React.FC = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [toggle, setToggle] = useState(false);
  // const [name, setName] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | undefined>();
  const [favorites, setFavorites] = useState<ICharacter[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  console.log(innerWidth);

  //grab and store search params
  const species: string | null = searchParams.get("species");
  const gender: string | null = searchParams.get("gender");
  const status: string | null = searchParams.get("status");
  const name: string | null = searchParams.get("name");

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
      <Header />
      {/* //previously was its own component, but found I didn't love the prop drilling as the page got larger. If I continue to
      expand the page, I'd likely turn this back into a component and utilize context or redux for state management. */}
      <div className="content-container">
        {error || loading ? (
          ""
        ) : (
          <>
            {innerWidth < 800 && (
              <>
              <div className="responsive-filter">
               
                  <p>Show Filters
                  <i
                    className="fa fa-filter"
                    onClick={() => setToggle(!toggle)}
                  ></i>
              </p>
              </div>
                {toggle && (
                  <div className="responsive-dropdown">
                    <DropDown
                      filters={speciesFilter}
                      queryString={queryString}
                      query={"species"}
                      param={species ? species : ""}
                      setCurrentPage={setCurrentPage}
                    />
                    <DropDown
                      filters={genderFilter}
                      queryString={queryString}
                      query={"gender"}
                      param={gender ? gender : ""}
                      setCurrentPage={setCurrentPage}
                    />
                    <DropDown
                      filters={statusFilter}
                      queryString={queryString}
                      query={"status"}
                      param={status ? status : ""}
                      setCurrentPage={setCurrentPage}
                    />
                 </div> 
                )}
              </>
            )}
            {innerWidth > 800 && (
              <div className="sidebar">
                <div className="filters">
                  <img
                    src="https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-monsters-transparent-png-stickpng-2.png"
                    alt="rick and morty monsters transparent png stickpng"
                  />
                  <h4>Open your eyes, Morty!</h4>

                  <DropDown
                    filters={speciesFilter}
                    queryString={queryString}
                    query={"species"}
                    param={species ? species : ""}
                    setCurrentPage={setCurrentPage}
                  />
                  <DropDown
                    filters={genderFilter}
                    queryString={queryString}
                    query={"gender"}
                    param={gender ? gender : ""}
                    setCurrentPage={setCurrentPage}
                  />
                  <DropDown
                    filters={statusFilter}
                    queryString={queryString}
                    query={"status"}
                    param={status ? status : ""}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </div>
            )}
          </>
        )}
        <Routes>
          <Route
            path="/"
            element={
              data || loading ? (
                <MainFeed
                  data={data}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                  queryString={queryString}
                  name={name ? name : ""}
                  loading={loading}
                />
              ) : (
                <NothingToSee text={"oops, something went wrong!"} />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
