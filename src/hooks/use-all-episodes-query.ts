import { useQuery } from '@tanstack/react-query'

import fetchAllEpisodes from '@/api/fetch-all-episodes'

export default function useAllEpisodesQuery() {
  return useQuery(['episodes'], () => fetchAllEpisodes())
}
