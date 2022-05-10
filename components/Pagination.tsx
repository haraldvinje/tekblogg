import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export const Pagination = ({
  onPageChange,
  pagesCount,
  initialPage = 0
}: {
  onPageChange: (pageNumber: number) => void
  pagesCount: number
  initialPage?: number
}) => {
  const numberOfPageIcons = 5
  const [pageNumbers, setPageNumbers] = useState(Array.from({ length: pagesCount }, (_, i) => i))
  const [currentPageNumber, setCurrentPageNumber] = useState(initialPage)
  const [pageNumbersToDisplay, setPageNumbersToDisplay] = useState(
    pageNumbers.slice(initialPage, initialPage + numberOfPageIcons)
  )

  useEffect(() => {
    setPageNumbers(Array.from({ length: pagesCount }, (_, i) => i))
    setPageNumbersToDisplay(Array.from({ length: initialPage + numberOfPageIcons }, (_, i) => i))
    setCurrentPageNumber(0)
    return () => {
      setPageNumbers([])
      setPageNumbersToDisplay([])
      setCurrentPageNumber(0)
    }
  }, [initialPage, pagesCount])

  useEffect(() => {
    const start = Math.max(Math.min(initialPage, pagesCount - numberOfPageIcons), 0)
    const end = initialPage + numberOfPageIcons
    setPageNumbersToDisplay(pageNumbers.slice(start, end))
    return () => {
      setPageNumbersToDisplay([])
    }
  }, [initialPage, pagesCount, pageNumbers])

  const handlePageClick = (pageNumber: number) => {
    setCurrentPageNumber(pageNumber)
    onPageChange(pageNumber)
  }

  return (
    <div className="flex scale-75 justify-center space-x-8 sm:scale-100">
      <button
        className={`w-8 rounded-lg border border-gray-300 py-1
					transition-colors duration-200 ease-in-out hover:bg-slate-400
					${currentPageNumber > 0 ? '' : 'invisible'}`}
        onClick={() => handlePageClick(currentPageNumber - 1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="flex justify-center space-x-4">
        {currentPageNumber >= 2 && pagesCount > numberOfPageIcons && (
          <>
            <button
              className="w-8 rounded-lg border border-gray-300 py-1
                transition-colors duration-200 ease-in-out hover:bg-slate-400
            "
              onClick={() => handlePageClick(0)}
            >
              1
            </button>
            {pageNumbersToDisplay[0] !== 1 && <span>...</span>}
          </>
        )}
        {pageNumbersToDisplay.map((i) => (
          <button
            className={`w-8 rounded-lg border border-gray-300 py-1
							transition-colors duration-200 ease-in-out hover:bg-slate-400
							${currentPageNumber === i ? 'border-black' : ''}`}
            key={i}
            onClick={() => handlePageClick(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        className={`rounded-lg border border-gray-300 px-2 py-1 ${
          currentPageNumber < pagesCount - 1 ? '' : 'invisible'
        }`}
        onClick={() => handlePageClick(currentPageNumber + 1)}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  )
}
