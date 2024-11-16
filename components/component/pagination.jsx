'use client'

import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "../../components/ui/button"

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const [pages, setPages] = useState([])

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  useEffect(() => {
    const calculatePageRange = () => {
      const pageRange = []
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          pageRange.push(i)
        }
      } else {
        if (currentPage <= 3) {
          pageRange.push(1, 2, 3, 4, 5, '...', totalPages)
        } else if (currentPage >= totalPages - 2) {
          pageRange.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
        } else {
          pageRange.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
        }
      }
      setPages(pageRange)
    }

    calculatePageRange()
  }, [currentPage, totalPages])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  return (
    <nav className="flex items-center justify-center space-x-2" aria-label="Pagination">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {pages.map((page, index) => (
        <Button
          key={index}
          variant={page === currentPage ? "default" : "outline"}
          size="icon"
          onClick={() => typeof page === 'number' && handlePageChange(page)}
          disabled={page === '...'}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}

Pagination.propTypes = {
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired
}

Pagination.defaultProps = {
  totalItems: 100,
  itemsPerPage: 10,
  currentPage: 1
}