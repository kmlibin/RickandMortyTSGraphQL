import React from "react";

import './Header.scss'

export const Header = () => {
  return (
    <div className="hero">
      <div className="title">
        <img
          data-aos="flip-right"
          data-aos-duration="2000"
          src="https://www.freepnglogos.com/uploads/rick-and-morty-png/list-rick-and-morty-episodes-wikipedia-24.png"
        />
        <h3>Boom! Big reveal! I turned myself into a pickle!</h3>
      </div>
    </div>
  );
};
