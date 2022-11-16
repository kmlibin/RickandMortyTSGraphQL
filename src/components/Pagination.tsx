import React from "react";


//styles 
import '../styles/pagination.scss';


interface Props {
  currentPage: Number | undefined;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: Number | undefined;
}

const Pagination = ({ currentPage, setCurrentPage, totalPages }: Props) => {

  //handles next page
  const handleNextPage = () : void => {
    if (currentPage === null) {
      setCurrentPage(1);
    }
    setCurrentPage(Number(currentPage) + 1);
  };


  //handles previous page
  const handlePrevPage = () : void => {
    if (currentPage === null) {
      setCurrentPage(1);
    }
    setCurrentPage(Number(currentPage) - 1);
  };
//maybe add total results at the bottom, beneath the buttons? i.e "there are 200 characters that match this search"

  return (
    <div className="pagination">
      <button
        type="button"
        aria-label="Go to previous page"
        onClick={handlePrevPage}
        disabled={currentPage === 1 ? true : false}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
          
           <p>{Number(currentPage)} of {Number(totalPages)}</p>
          
      <button
        type="button"
        aria-label="Go to next page"
        onClick={handleNextPage}
        disabled={currentPage === totalPages ? true : false}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
