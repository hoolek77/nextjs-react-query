import type { Dispatch, SetStateAction } from 'react'
import { useCallback } from 'react'

import type { CharacterQuery } from '@/hooks/use-characters-query'
import type { Character } from '@/types/common'

import CharacterCard, { CHARACTER_CARD_WIDTH } from '../character-card'

import styled from 'styled-components'

interface CharactersListProps {
  data?: CharacterQuery
  isLoading: boolean
  isError: boolean
  selectedCharacters: Character['id'][]
  setSelectedCharacters: Dispatch<SetStateAction<Character['id'][]>>
}

const GRID_GAP = 16

export default function CharactersList({
  data,
  isError,
  isLoading,
  selectedCharacters,
  setSelectedCharacters,
}: CharactersListProps) {
  const handleSelect = useCallback((id: number) => {
    setSelectedCharacters((prev) => {
      if (prev.includes(id)) {
        return prev.filter((prevId) => prevId !== id)
      }

      return [...prev, id]
    })
  }, [])

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Something went wrong!</div>

  if (!data) return null

  return (
    <CharactersListWrapper>
      {data.results.map((character) => (
        <CharacterCard
          key={character.id}
          {...character}
          selected={selectedCharacters.includes(character.id)}
          onSelect={handleSelect}
        />
      ))}
    </CharactersListWrapper>
  )
}

const CharactersListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, ${CHARACTER_CARD_WIDTH}px);
  gap: ${GRID_GAP}px;
  // max-width value compensates for maximum of 4 columns including the gaps
  width: ${CHARACTER_CARD_WIDTH * 4 + 3 * GRID_GAP}px;
  max-width: 95%;
  justify-content: center;
`
