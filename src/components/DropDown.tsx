import React, {useState} from 'react'
import {Select} from '../model'

interface Props {
    filters: Select[]
}

export const DropDown = ({filters}: Props) => {
  return (
    <div className="filterboxes">
            <select>
          <option hidden>no select</option>
          {filters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
    </div>
  )
}

