import React from "react";

import { useSearchParams } from "react-router-dom";

//TS interfaces
import { ISelect } from "../../models/model";

//styles
import "../dropdown/dropdown.scss"

interface Props {
  filters: ISelect[];
  queryString: {
    [k: string]: string;
  };
  query: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  param: string;
}

export const DropDown = ({ filters, queryString, query, setCurrentPage, param }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="filterboxes">
      {!param && (
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSearchParams({ ...queryString, [query]: e.target.value });
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
