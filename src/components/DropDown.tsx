import React, {useState} from 'react'
import {Select, QueryString} from '../model'
import {useSearchParams} from 'react-router-dom'

interface Props {
    filters: Select[],
    queryString: {
      [k: string]: string
    },
    query: string

}

export const DropDown = ({filters, queryString, query}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <div className="filterboxes">
            <select
            onChange ={(e :React.ChangeEvent<HTMLSelectElement>) => setSearchParams({ ...queryString, [query]: e.target.value })}>
          <option hidden>no select</option>
          {filters.map((filter) => (
            //make unique keys
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
    </div>
  )
}

