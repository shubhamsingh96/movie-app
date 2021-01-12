import React from "react";

const Pagination = React.memo(({ lastPage, currentPage, onClick }) => {
  const pagination = [];

  if (lastPage > 1) {
    if (currentPage > 1) {
      if (currentPage - 2 > 1 && currentPage) {
        pagination.push(currentPage - 2);
      }
      if (currentPage - 1 > 1 && currentPage) {
        pagination.push(currentPage - 1);
      }
      if (currentPage !== 1 && currentPage !== lastPage) {
        pagination.push(currentPage);
      }
      if (currentPage + 1 < lastPage) {
        pagination.push(currentPage + 1);
      }
      if (currentPage + 2 < lastPage) {
        pagination.push(currentPage + 2);
      }
    }
    if (currentPage === 1) {
      if (currentPage + 1 < lastPage) {
        pagination.push(currentPage + 1);
      }
      if (currentPage + 2 < lastPage) {
        pagination.push(currentPage + 2);
      }
      if (currentPage + 3 < lastPage) {
        pagination.push(currentPage + 3);
      }
    }
  }
  const pagesArray = pagination.map((pg, index) => (
    <button
      key={index}
      className='pagination-tab'
      className={`pagination-tab ${ currentPage === pg ? 'btn-gray' : 'btn-white' }`}
      onClick={() => onClick(pg)}
    >
      {pg}
    </button>
  ));

  pagesArray.unshift(
    <button
      key="initial"
      className={`pagination-tab ${ currentPage === 1 ? 'btn-gray' : 'btn-white' }`}
      onClick={() => onClick(1)}
    >
      1
    </button>
  );
  if (currentPage !== lastPage && currentPage <= lastPage) {
    pagesArray.push(
      <button
        key="last-page"
        className='pagination-tab'
        className={`pagination-tab ${ currentPage === lastPage ? 'btn-gray' : 'btn-white' }`}
        onClick={() => onClick(lastPage)}
      >
        {lastPage}
      </button>
    );
  }
  pagesArray.unshift(
    <button
      key="prev"
      className="pagination-btn"
      onClick={() => (currentPage === 1 ? null : onClick(currentPage - 1))}
    >
      Previous
    </button>
  );
  pagesArray.push(
    <button
      key="next"
      className="pagination-btn"
      onClick={currentPage === lastPage ? null :() => onClick(currentPage + 1)}
    >
      Next
    </button>
  );
  return pagesArray;
});

export default Pagination;
