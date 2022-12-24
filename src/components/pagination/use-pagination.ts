import { useMemo } from 'react'

export const DOTS = '...'

const NEIGHBOR_COUNT = 2
const FIRST_PAGE_INDEX = 1

const range = (start: number, end: number): number[] => {
  const length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}

interface PaginationOptions {
  count: number
  pageSize: number
  currentPage: number
}

export default function usePagination({
  count,
  pageSize,
  currentPage,
}: PaginationOptions) {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(count / pageSize)
    const totalPageNumbers = NEIGHBOR_COUNT + 5

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - NEIGHBOR_COUNT, 1)
    const rightSiblingIndex = Math.min(
      currentPage + NEIGHBOR_COUNT,
      totalPageCount
    )

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * NEIGHBOR_COUNT
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * NEIGHBOR_COUNT
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      )

      return [FIRST_PAGE_INDEX, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)

      return [FIRST_PAGE_INDEX, DOTS, ...middleRange, DOTS, totalPageCount]
    }

    return []
  }, [count, pageSize, currentPage])

  return { paginationRange }
}
