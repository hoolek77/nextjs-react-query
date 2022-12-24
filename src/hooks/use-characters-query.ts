import { useQuery } from '@tanstack/react-query'

import fetchCharacters from '@/api/fetch-characters'
import type { Character } from '@/types/common'

const HOUR_IN_MS = 1000 * 60 * 60

interface Info {
  count: number
  next: string
  pages: number
  prev: string
}

export interface CharacterQuery {
  info: Info
  results: Character[]
}

export default function useCharactersQuery(page: number) {
  return useQuery<CharacterQuery>(
    ['characters', page],
    () => fetchCharacters(page),
    {
      staleTime: HOUR_IN_MS,
      keepPreviousData: true,
    }
  )
}
