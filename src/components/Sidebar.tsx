import React, { useState } from "react";
import {DropDown} from "./DropDown";
import "./Sidebar.css";
import {QueryString} from '../model'

type Props = {
  queryString: {
    [k: string]: string
  };
};

const speciesFilter = [
  { value: "human", label: "Human" },
  { value: "alien", label: "Alien" },
  { value: "robot", label: "Robot" },
  { value: "humanoid", label: "Humanoid" },
  { value: "cronenberg", label: "Cronenberg" },
  { value: "mythological creature", label: "Mythological Creature" },
];
const genderFilter = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "unknown", label: "unknown" },
];

const statusFilter = [
  { value: "alive", label: "Alive" },
  { value: "dead", label: "Dead" },
  { value: "unknown", label: "unknown" },
];

export default function Sidebar({queryString}: Props) {

  return (
    <div className="sidebar">
      <h4>Characters</h4>
      <h4>Favorites</h4>
      <h4>Filters</h4>
      <div className="filters">
        <DropDown filters={speciesFilter} queryString={queryString} query={'species'}/>
        <DropDown filters={genderFilter} queryString={queryString} query={'gender'}/>
        <DropDown filters={statusFilter} queryString={queryString} query={'status'}/>
      </div>
    </div>
  );
}
