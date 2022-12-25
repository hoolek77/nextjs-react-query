import type { Episode, Info } from '@/types/common'

import { api } from '.'

export interface EpisodeQuery {
  info: Info
  results: Episode[]
}

// Due to API limitations all episodes can't be fetched at once
// so we need to fetch them page by page and accumulate data
export default async function fetchAllEpisodes() {
  let currentPageEndpoint = '/episode'

  const episodes: Episode[] = []

  while (currentPageEndpoint) {
    const { data } = await api.get<EpisodeQuery>(currentPageEndpoint)

    episodes.push(...data.results)

    if (!data.info.next) {
      return episodes
    }

    currentPageEndpoint = data.info.next
  }
}
