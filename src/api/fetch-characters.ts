import type { Character, Info } from '@/types/common'

import { api } from '.'

export interface CharactersQuery {
  info: Info
  results: Character[]
}

export default async function fetchCharacters(page: number, name?: string) {
  const { data } = await api.get<CharactersQuery>(
    `/character?page=${page}${name ? `&name=${name}` : ''}`
  )

  return data
}
