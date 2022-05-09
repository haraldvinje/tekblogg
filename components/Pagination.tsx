import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const Pagination = ({
  onPageChange,
  pagesTotal,
  initialPage = 0,
}: {
  onPageChange: (pageNumber: number) => void;
  pagesTotal: number;
  initialPage?: number;
}) => {
  const numberOfPageIcons = 5;
  const [pageNumbers, setPageNumbers] = useState(Array.from({ length: pagesTotal }, (_, i) => i));
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [pagesToDisplay, setPagesToDisplay] = useState(
    pageNumbers.slice(initialPage, initialPage + numberOfPageIcons)
  );

  useEffect(() => {
    setPageNumbers(Array.from({ length: pagesTotal }, (_, i) => i))
    setPagesToDisplay(Array.from({ length: initialPage + numberOfPageIcons }, (_, i) => i))
    setCurrentPageNumber(0);
    return () => {
      setPageNumbers([]);
      setPagesToDisplay([]);
      setCurrentPageNumber(0);
    }
  }, [initialPage, pagesTotal])

  useEffect(() => {
    const start = Math.max(Math.min(initialPage, pagesTotal - numberOfPageIcons), 0);
    const end = initialPage + numberOfPageIcons;
    setPagesToDisplay(
      pageNumbers.slice(
        start,
        end
      )
    );
    return () => {
      setPagesToDisplay([]);
    }
  }, [initialPage, pagesTotal, pageNumbers])

  const handlePageClick = (pageNumber: number) => {
    setCurrentPageNumber(pageNumber);
    onPageChange(pageNumber);
  };

  return (
    <div className="flex justify-center space-x-8 sm:scale-100 scale-75">
      <button
        className={`
          w-8 py-1 border border-gray-300 rounded-lg
          transition-colors duration-200 ease-in-out hover:bg-slate-400
          ${currentPageNumber > 0 ? "" : "invisible"}
        `}
        onClick={() => handlePageClick(currentPageNumber - 1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="flex justify-center space-x-4 max-w-24">
        {currentPageNumber >= 2 && pagesTotal > numberOfPageIcons && (
          <>
            <button
              className="
                w-8 py-1 border border-gray-300 rounded-lg
                transition-colors duration-200 ease-in-out hover:bg-slate-400
              "
              onClick={() => handlePageClick(0)}
            >
              1
            </button>
            {pagesToDisplay[0] !== 1 && <span>...</span>}
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
          currentPageNumber < pagesTotal - 1 ? "" : "invisible"
        }`}
        onClick={() => handlePageClick(currentPageNumber + 1)}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};
