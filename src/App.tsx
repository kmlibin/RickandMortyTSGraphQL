import React from "react";

import "./App.css";
import { CharacterList } from "./components/CharacterList";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
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
        <CharacterList />
      </div>
    </div>
  );
};

export default App;
