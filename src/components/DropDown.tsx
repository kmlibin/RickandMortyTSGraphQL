import React, { useState } from "react";
import { Select, QueryString } from "../model";
import { useSearchParams } from "react-router-dom";

interface Props {
  filters: Select[];
  queryString: {
    [k: string]: string;
  };
  query: string;
}

export const DropDown = ({ filters, queryString, query }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showButton, setShowButton] = useState<boolean>(true);
  const [queryValue, setQueryValue] = useState<string>(query || "");
console.log(query)
  //add blank so that filters clear...or an x or something
  return (
    <div className="filterboxes">
      {showButton && (
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSearchParams({ ...queryString, [query]: e.target.value });
            setShowButton(false);
            setQueryValue(e.target.value)
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
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
        </button>
      )}
    </div>
  );
};
