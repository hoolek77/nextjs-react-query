import { Icon } from '@iconify/react'
import { useRef } from 'react'
import { FocusScope } from 'react-aria'

import styled from 'styled-components'

export interface SearchBarProps {
  placeholder: string
  onChange: (value: string) => void
  value: string
  disabled?: boolean
}

export default function SearchBar({
  placeholder,
  onChange,
  value,
  disabled = false,
  ...props
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <SearchBarWrapper>
      <SearchBarInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        ref={inputRef}
        role="searchbox"
        {...props}
      />
      <SearchIcon
        icon="ic:outline-search"
        width={24}
        height={24}
        color="#757F8F"
        aria-label="Search"
        disabled={disabled}
        onClick={() => inputRef?.current?.focus()}
      />
      {value?.length > 0 && (
        <FocusScope restoreFocus>
          <ClearIconButton onClick={() => onChange('')}>
            <Icon
              icon="radix-icons:cross-2"
              width={16}
              height={16}
              color="#757F8F"
            />
          </ClearIconButton>
        </FocusScope>
      )}
    </SearchBarWrapper>
  )
}

const ClearIconButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;

  &:focus-visible {
    box-shadow: 0px 0px 0px 2.5px ${({ theme: { colors } }) => colors.primary};
  }
`

const SearchIcon = styled(Icon)<{ disabled: boolean }>`
  position: absolute;
  cursor: text;
  top: 50%;
  left: 24px;
  transform: translate(-50%, -50%);

  &:hover {
    fill: ${({ theme: { colors }, disabled }) => !disabled && colors.primary};
  }
`

export const SearchBarWrapper = styled.div`
  position: relative;
  width: fit-content;
`

const SearchBarInput = styled.input`
  width: 100%;
  height: 48px;
  background-color: ${({ theme: { colors } }) => colors.secondary};
  border-radius: 27px;
  border: none;
  outline: none;
  padding: 0 48px;
  font-size: 16px;
  color: ${({ theme: { colors } }) => colors.neutral};
  transition: all 0.2s;

  &:disabled {
    cursor: not-allowed;

    & + ${SearchIcon} {
      cursor: not-allowed;
    }
  }

  &:focus-visible,
  &:hover:not(:disabled) {
    & + ${SearchIcon} {
      fill: ${({ theme: { colors } }) => colors.primary};
    }
  }

  &::placeholder {
    color: ${({ theme: { colors } }) => colors.textSecondary};
  }

  &:focus-visible {
    box-shadow: 0px 0px 0px 2.5px ${({ theme: { colors } }) => colors.primary};
  }
`
