import { api } from '.'

export default async function fetchCharacters(page: number) {
  const { data } = await api.get(`/character?page=${page}`)

  return data
}
