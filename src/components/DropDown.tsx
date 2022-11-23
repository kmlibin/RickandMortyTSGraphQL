import React, { useState } from "react";

import { useSearchParams } from "react-router-dom";

//TS interfaces
import { Select } from "../files/model";

//styles

import "../styles/dropdown.scss"

interface Props {
  filters: Select[];
  queryString: {
    [k: string]: string;
  };
  query: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  param: string;
}

export const DropDown = ({ filters, queryString, query, setCurrentPage, param }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryValue, setQueryValue] = useState<string>(query || "");

//todo: if user already has q params in url, toggle so that the buttons show, not the dropdowns
//nice to have searchbar option for user to input their own dimension/species/gender
console.log(param)
  return (
    <div className="filterboxes">
      {!param && (
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSearchParams({ ...queryString, [query]: e.target.value });
            setQueryValue(e.target.value)
            setCurrentPage(1)
          }}
        >
          <option hidden>{query}</option>
          {filters.map((filter) => (
            //make unique keys
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      )}

      {param && (
        <button className="filter-button">
          {param.charAt(0).toUpperCase() + param.slice(1)}
          <span
            onClick={() => {
              searchParams.delete(query);
              setSearchParams(searchParams);
              setCurrentPage(1)
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
        </button>
      )}
    </div>
  );
};
