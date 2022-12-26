import { dehydrate, QueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import fetchCharacters from '@/api/fetch-characters'
import CharactersList from '@/components/characters-list'
import Pagination from '@/components/pagination'
import SearchBar from '@/components/search-bar'
import useCharactersQuery from '@/hooks/use-characters-query'
import useDebounce from '@/hooks/use-debounce'
import type { Character } from '@/types/common'

import type { ParsedUrlQuery } from 'querystring'
import styled from 'styled-components'

const FIRST_PAGE = 1
const PAGE_SIZE = 20

const getInitialPageFromQuery = (query: ParsedUrlQuery) => {
  const page = Number(query.page)

  if (Number.isNaN(page) || page < FIRST_PAGE) {
    return FIRST_PAGE
  }

  return page
}

const getInitialSearchFromQuery = (query: ParsedUrlQuery) => {
  const search = query.search

  if (typeof search !== 'string') {
    return ''
  }

  return search
}

export const getServerSideProps: GetServerSideProps<{
  initialPage: number
  initialSearch: string
}> = async (ctx) => {
  const queryClient = new QueryClient()

  const page = getInitialPageFromQuery(ctx.query)
  const search = getInitialSearchFromQuery(ctx.query)
  const queryKey = ['characters', page, search]

  await queryClient.prefetchQuery(queryKey, () => fetchCharacters(page, search))

  const prefetchedQueryData = queryClient.getQueryData(queryKey)

  if (!prefetchedQueryData) {
    return {
      props: {
        initialPage: FIRST_PAGE,
        initialSearch: '',
      },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialPage: page,
      initialSearch: search,
    },
  }
}
export default function Home({
  initialPage,
  initialSearch,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const [page, setPage] = useState(initialPage)
  const [search, setSearch] = useState(initialSearch)
  const [selectedCharacters, setSelectedCharacters] = useState<
    Character['id'][]
  >([])
  const debouncedSearch = useDebounce(search, 500)
  const { data, isLoading, isFetching, isError } = useCharactersQuery(
    page,
    debouncedSearch
  )

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(FIRST_PAGE)
    setSelectedCharacters([])
  }

  useEffect(() => {
    router.replace(
      `/?page=${page}${search ? `&search=${debouncedSearch}` : ''}`,
      undefined,
      { shallow: true }
    )
  }, [page, debouncedSearch])

  return (
    <>
      <Head>
        <title>Rick & Morty react-query</title>
        <meta
          name="description"
          content="React query based site that allows for searching characters from Rick and Morty series."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <header>
          <Heading>Rick & Morty Pagination</Heading>
        </header>
        <p>Selected characters: {selectedCharacters.length}</p>
        <SearchBar
          value={search}
          onChange={(value) => handleSearchChange(value)}
          placeholder="Character name"
        />
        <Pagination
          count={data?.info.count || 0}
          currentPage={page}
          onPageChange={(pageNumber) => setPage(pageNumber)}
          pageSize={PAGE_SIZE}
          disabled={isLoading || isFetching}
        />
        <CharactersList
          data={data}
          isLoading={isLoading}
          isError={isError}
          selectedCharacters={selectedCharacters}
          setSelectedCharacters={setSelectedCharacters}
        />
      </Main>
    </>
  )
}

const Heading = styled.h1`
  font-weight: 500;
  text-align: center;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
`
