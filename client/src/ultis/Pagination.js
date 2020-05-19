import React from 'react';

const Pagination = ({ currPage, totalPage, setCurrPage }) => {
  return (
    <div className='pagination'>
      {0 < currPage - 1 && (
        <a href='#!' onClick={() => setCurrPage(currPage - 1)}>
          &laquo;
        </a>
      )}
      {0 < currPage - 3 && (
        <a href='#!' onClick={() => setCurrPage(currPage - 3)}>
          {currPage - 3}
        </a>
      )}
      {0 < currPage - 2 && (
        <a href='#!' onClick={() => setCurrPage(currPage - 2)}>
          {currPage - 2}
        </a>
      )}
      {0 < currPage - 1 && (
        <a href='#!' onClick={() => setCurrPage(currPage - 1)}>
          {currPage - 1}
        </a>
      )}
      <a href='#!' className='active'>
        {currPage}
      </a>
      {totalPage > currPage + 2 && (
        <a href='#!' onClick={() => setCurrPage(currPage + 3)}>
          {currPage + 3}
        </a>
      )}
      {totalPage > currPage + 1 && (
        <a href='#!' onClick={() => setCurrPage(currPage + 2)}>
          {currPage + 2}
        </a>
      )}
      {totalPage > currPage && (
        <a href='#!' onClick={() => setCurrPage(currPage + 1)}>
          {currPage + 1}
        </a>
      )}
      {totalPage > currPage && (
        <a href='#!' onClick={() => setCurrPage(currPage + 1)}>
          &raquo;
        </a>
      )}
    </div>
  );
};

export default Pagination;
