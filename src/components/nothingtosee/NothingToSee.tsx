import React from 'react'

//styles
import "../nothingtosee/nothingtosee.scss"

interface Props {
    text: string;
}

const NothingToSee = ({text}: Props) => {
  return (
    <div className="no-info">
    <img
      src="https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-portal-moon-mod-download-35.png"
      alt="rick and morty portal moon mod download"
    />
    <p>{text}</p>
  </div>
  )
}

export default NothingToSee