import { memo } from "react";



const Pagination = ({ NoOfPages, currPage, setCurrPage }) => {
  const handlePageNumber = (n) => {
    setCurrPage(n);
  };
  const gotoNextPage = () => {
    setCurrPage((prev) => prev + 1);
  };

  const gotoPrevPage = () => {
    setCurrPage((prev) => prev - 1);
  };

  console.log("child render")

  return (
    <div className="pagination-container">
      <button
        className="backward-btn"
        onClick={() => {
          gotoPrevPage();
        }}
        disabled={currPage === 0}
      >
        &lt;&lt;&nbsp;
      </button>

      <div>
        {[...Array(NoOfPages).keys()].map((number) => (
          <span
            key={number}
            className={`page-no ${currPage === number ? "active" : ""}`}
            onClick={() => handlePageNumber(number)}
          >
            {number}
          </span>
        ))}
      </div>

      <button
        className="farward-btn"
        onClick={() => {
          gotoNextPage();
        }}
        disabled={currPage === NoOfPages - 1}
      >
        &nbsp;&gt;&gt;
      </button>
    </div>
  );
};

export default memo(Pagination);
