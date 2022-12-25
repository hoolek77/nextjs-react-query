import { api } from '.'

export default async function fetchCharacters(page: number, name?: string) {
  const { data } = await api.get(
    `/character?page=${page}${name ? `&name=${name}` : ''}`
  )

  return data
}
