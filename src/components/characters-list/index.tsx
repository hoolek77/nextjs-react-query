import type { CharacterQuery } from '@/hooks/use-characters-query'

interface CharactersListProps {
  data?: CharacterQuery
  isLoading: boolean
  isError: boolean
}

export default function CharactersList({
  data,
  isError,
  isLoading,
}: CharactersListProps) {
  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Something went wrong!</div>

  if (!data) return null

  return (
    <pre>
      <code>
        {JSON.stringify(
          data.results.map(({ name }) => ({
            name,
          })),
          null,
          2
        )}
      </code>
    </pre>
  )
}
