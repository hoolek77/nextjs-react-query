import { dehydrate, QueryClient } from '@tanstack/react-query'

import Head from 'next/head'

import fetchCharacters from '@/api/fetchCharacters'
import useCharactersQuery from '@/hooks/useCharactersQuery'

import styled from 'styled-components'

const FIRST_PAGE = 1

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['characters', FIRST_PAGE], () =>
    fetchCharacters(FIRST_PAGE)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function Home() {
  const { data, isLoading, error } = useCharactersQuery(FIRST_PAGE)

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Something went wrong!</div>

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Heading>Rick & Morty Pagination</Heading>
        <pre>
          <code>{JSON.stringify(data?.info, null, 2)}</code>
        </pre>
        <pre>
          <code>
            {JSON.stringify(
              data?.results.map(({ gender, id, name, species, url }) => ({
                id,
                name,
                gender,
                species,
                url,
              })),
              null,
              2
            )}
          </code>
        </pre>
      </main>
    </>
  )
}

const Heading = styled.h1`
  font-weight: 500;
`
