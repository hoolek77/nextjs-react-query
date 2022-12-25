import { useQuery } from '@tanstack/react-query'

import fetchCharacters from '@/api/fetch-characters'

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000

export default function useCharactersQuery(page: number, search: string) {
  return useQuery(
    ['characters', page, search],
    () => fetchCharacters(page, search),
    {
      staleTime: FIVE_MINUTES_IN_MS,
      keepPreviousData: true,
      retry: false,
    }
  )
}
