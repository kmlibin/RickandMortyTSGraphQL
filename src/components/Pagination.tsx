import React, {useMemo} from 'react'

interface Props {
    currentPage: Number;
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>
    totalPages: Number | undefined;
}

const Pagination = ({currentPage, setCurrentPage, totalPages}: Props) => {
  

  
  let pageButtons =[]

  if(totalPages) {


  for (let i = 1; i <= totalPages; i++){
    pageButtons.push(<button key={i} onClick = {() => setCurrentPage(i)}> {i} </button>)
    
  }

}



console.log(pageButtons)
  return (
    <div className="pagination">
      {pageButtons}
    </div>
  )
}

export default Pagination