import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const Pagination = ({
  initalPageNumber,
  onPageChange,
  pageCount,
}: {
  initalPageNumber: number;
  onPageChange: (pageNumber: number) => void;
  pageCount: number;
}) => {
  const numberOfPageIcons = 5;
  const pageNumbers = Array.from(Array(pageCount).keys());
  const [currentPageNumber, setCurrentPage] = useState(initalPageNumber);
  const [pagesToDisplay, setPagesToDisplay] = useState(
    pageNumbers.slice(currentPageNumber, currentPageNumber + numberOfPageIcons)
  );

  useEffect(() => {
    const start = Math.min(currentPageNumber, pageCount - numberOfPageIcons)
    const end = currentPageNumber + numberOfPageIcons;
    setPagesToDisplay(
      pageNumbers.slice(
        start,
        end
      )
    );
  }, [currentPageNumber, pageNumbers, pageCount]);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  return (
    <div className="flex justify-between sm:scale-100 scale-75">
      <button
        className={`px-2 py-1 border border-gray-300 rounded-lg ${
          currentPageNumber > 0 ? "" : "invisible"
        }`}
        onClick={() => handlePageClick(currentPageNumber - 1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="flex justify-center space-x-4 max-w-24">
        {currentPageNumber >= 2 && (
          <>
            <button
              className="px-2 py-1 border border-gray-300 rounded-lg"
              onClick={() => handlePageClick(0)}
            >
              1
            </button>
            <span>...</span>
          </>
        )}
        {pagesToDisplay.map((i) => (
          <button
            className={`
                    w-8 py-1 border border-gray-300 rounded-lg
                    transition-colors duration-200 ease-in-out hover:bg-slate-400
                    ${currentPageNumber === i ? "border-black" : ""}
                `}
            key={i}
            onClick={() => handlePageClick(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        className={`px-2 py-1 border border-gray-300 rounded-lg ${
          currentPageNumber < pageCount - 1 ? "" : "invisible"
        }`}
        onClick={() => handlePageClick(currentPageNumber + 1)}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};
