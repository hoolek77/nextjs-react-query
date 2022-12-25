import type { EPISODE_PREFIX } from '@/constants/episode'

type Episode = `${typeof EPISODE_PREFIX}${number}`

export interface Character {
  id: number
  name: string
  status: string
  episode: Episode[]
  image: string
}
