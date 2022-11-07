import React, { useState } from "react";
import {DropDown} from "./DropDown";
import "./Sidebar.css";

type Props = {};

const speciesFilter = [
  { value: "human", label: "Human" },
  { value: "alien", label: "Alien" },
  { value: "robot", label: "Robot" },
  { value: "humanoid", label: "Humanoid" },
  { value: "cronenberg", label: "Cronenberg" },
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

export default function Sidebar({}: Props) {

  return (
    <div className="sidebar">
      <h4>Characters</h4>
      <h4>Favorites</h4>
      <h4>Filters</h4>
      <div className="filters">
        <DropDown filters={speciesFilter} />
        <DropDown filters={genderFilter} />
        <DropDown filters={statusFilter} />
      </div>
    </div>
  );
}
