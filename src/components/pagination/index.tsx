import { PaginationItem } from './pagination-item'
import usePagination from './use-pagination'

import styled from 'styled-components'

export interface PaginationProps {
  count: number
  pageSize: number
  currentPage: number
  onPageChange: (pageNumber: number) => void
  disabled?: boolean
}

export default function Pagination({
  currentPage,
  count,
  pageSize,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  const { paginationRange } = usePagination({
    currentPage,
    count,
    pageSize,
  })

  return (
    <PaginationNavWrapper>
      <PaginationList role="tablist">
        {paginationRange.map((page, index) => (
          <PaginationItem
            key={`${page}-${index}`}
            isActive={currentPage === page}
            page={page as number}
            onPageChange={onPageChange}
            disabled={disabled}
          />
        ))}
      </PaginationList>
    </PaginationNavWrapper>
  )
}

const PaginationNavWrapper = styled.nav`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`

const PaginationList = styled.ul`
  display: flex;
  gap: 4px;
  margin: 0;
  padding: 0;
`
