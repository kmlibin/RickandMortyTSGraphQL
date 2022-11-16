import React, { useState } from "react";

import { useSearchParams } from "react-router-dom";

//TS interfaces
import { Select } from "../resources/model";

interface Props {
  filters: Select[];
  queryString: {
    [k: string]: string;
  };
  query: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const DropDown = ({ filters, queryString, query, setCurrentPage }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showButton, setShowButton] = useState<boolean>(true);
  const [queryValue, setQueryValue] = useState<string>(query || "");

//todo: if user already has q params in url, toggle so that the buttons show, not the dropdowns
//nice to have searchbar option for user to input their own dimension/species/gender

  return (
    <div className="filterboxes">
      {showButton && (
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSearchParams({ ...queryString, [query]: e.target.value });
            setShowButton(false);
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

      {!showButton && (
        <button className="filter-button">
          {queryValue.charAt(0).toUpperCase() + queryValue.slice(1)}
          <span
            className="close"
            onClick={() => {
              setShowButton(true);
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
