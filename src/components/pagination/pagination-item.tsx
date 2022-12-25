import { hexToRgba } from '@/utils/color'

import { DOTS } from './use-pagination'

import styled from 'styled-components'

interface PaginationItemProps {
  isActive: boolean
  page: number | string
  onPageChange: (pageNumber: number) => void
  disabled: boolean
}

const DOTS_UNICODE = '\u2026'

export const PaginationItem = ({
  isActive,
  page,
  onPageChange,
  disabled,
}: PaginationItemProps) => {
  if (page === DOTS) {
    return <PaginationDots disabled={disabled}>{DOTS_UNICODE}</PaginationDots>
  }

  return (
    <PaginationItemWrapper role="tab">
      <PaginationItemButton
        isActive={isActive}
        onClick={() => onPageChange(page as number)}
        disabled={disabled}
      >
        {page}
      </PaginationItemButton>
    </PaginationItemWrapper>
  )
}

const PaginationItemWrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
`

const PaginationItemButton = styled.button<{
  isActive: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 50%;
  background-color: ${({ isActive, theme: { colors } }) =>
    isActive ? colors.primary : 'transparent'};
  width: 24px;
  height: 24px;
  color: ${({ isActive, theme: { colors } }) =>
    isActive ? colors.textPrimary : colors.textSecondary};
  font-size: 14px;
  border: none;
  cursor: pointer;
  user-select: none;
  outline: none;
  transition: opacity 0.2s, transform 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ isActive, theme: { colors } }) =>
      !isActive && hexToRgba(colors.primary, 0.1)};
    border: 1px solid ${({ theme: { colors } }) => colors.primary};
  }

  &:focus-visible {
    background-color: ${({ isActive, theme: { colors } }) =>
      !isActive && hexToRgba(colors.primary, 0.2)};
  }

  &:active {
    transform: scale(0.96);
  }

  &:disabled {
    opacity: 0.38;
    cursor: default;
  }
`

const PaginationDots = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  list-style: none;
  user-select: none;
  opacity: ${({ disabled }) => disabled && 0.38};
  transition: opacity 0.2s;
`
