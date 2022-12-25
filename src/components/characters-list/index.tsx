import type { Dispatch, SetStateAction } from 'react'
import { useMemo } from 'react'
import { useCallback } from 'react'

import type { CharactersQuery } from '@/api/fetch-characters'
import useAllEpisodesQuery from '@/hooks/use-all-episodes-query'
import type { Character } from '@/types/common'

import CharacterCard, { CHARACTER_CARD_WIDTH } from '../character-card'

import styled from 'styled-components'

interface CharactersListProps {
  data?: CharactersQuery
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
  const episodes = useAllEpisodesQuery()

  const episodesMap = useMemo(
    () =>
      episodes.data?.reduce((acc, episode) => {
        acc[episode.id] = episode

        return acc
      }, {} as Record<number, typeof episodes.data[number]>),
    [episodes.data]
  )

  const handleSelect = useCallback((id: number) => {
    setSelectedCharacters((prev) => {
      if (prev.includes(id)) {
        return prev.filter((prevId) => prevId !== id)
      }

      return [...prev, id]
    })
  }, [])

  if (isLoading || episodes.isLoading) return <div>Loading...</div>

  if (isError || episodes.isError) return <div>Something went wrong!</div>

  if (!data || !episodesMap) return null

  return (
    <CharactersListWrapper>
      {data.results.map((character) => (
        <CharacterCard
          key={character.id}
          {...character}
          selected={selectedCharacters.includes(character.id)}
          onSelect={handleSelect}
          episodesMap={episodesMap}
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
