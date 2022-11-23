import React from 'react'

import "../styles/spinner.scss"

interface Props {

}

const Spinner = (props: Props) => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
      </div>
 
    </div>
  )
}


export default Spinner