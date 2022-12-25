import type { EPISODE_PREFIX } from '@/constants/episode'

type CharacterEpisode = `${typeof EPISODE_PREFIX}${number}`

export interface Character {
  id: number
  name: string
  status: string
  episode: CharacterEpisode[]
  image: string
}

export interface Info {
  count: number
  next: string | null
  pages: number
  prev: string | null
}

export interface Episode {
  id: number
  episode: string
}
