import { useQuery } from '@tanstack/react-query'

import fetchCharacters from '@/api/fetch-characters'
import type { Character } from '@/types/common'

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000

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

export default function useCharactersQuery(page: number, search: string) {
  return useQuery<CharacterQuery>(
    ['characters', page, search],
    () => fetchCharacters(page, search),
    {
      staleTime: FIVE_MINUTES_IN_MS,
      keepPreviousData: true,
      retry: false,
    }
  )
}
