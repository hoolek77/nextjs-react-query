# Next.js + react-query pagination project

In this project, I focused on optimizing lists with the `useCallback` and `memo` combination and prefetching data on the server with `getServerSideProps` and `queryCache.prefetchQuery`.

## Getting Started

To get started with this project, you'll need to have Node.js and yarn installed on your local machine. Then, follow these steps:

```bash
# clone repository
yarn install
yarn dev
```

The development server will start and the application will be available at <http://localhost:3000>.

## Learnt Concepts

### Optimizing Lists with useCallback and memo

Rendering large lists can be slow and inefficient in React. To optimize the performance of a list, you can use the useCallback hook and memo function to avoid unnecessary re-renders.

Here's an example of how to use these hooks to optimize a list of items:

```ts
// Item.tsx
import { memo } from 'react';

function Item({ item, onSelect }) {
  return (
    <div onClick={() => onSelect(item.id)}>
      {item.name}
    </div>
  );
}

export default memo(Item)

// List.tsx
import { memo, useState, useCallback } from 'react';

function List({ items }) {
  const [selectedItems, setSelectedItems] = useState([])

  const handleSelect = useCallback((id: number) => {
    setSelectedCharacters((prev) => {
      ...setting logic
    })
  }, [])

  return (
    <>
      {items.map(item => (
        <MemoizedItem key={item.id} item={item} />
      ))}
    </>
  );
}
```

## Prefetching Data on the Server with getServerSideProps and queryCache.prefetchQuery

react-query allows you to prefetch data on the server when rendering a page with Next.js. This can improve the performance of your application by reducing the time it takes to load data on the client.

To prefetch data, you can use the getServerSideProps function and the queryCache.prefetchQuery function like this:

```ts
import { getServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query'

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryCache.prefetchQuery(['key'], () => fetchData());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Page() {
  // The data will be available when the page is rendered
  const { data } = useQuery(['key'], () => fetchData());

  return <div>{data.name}</div>;
}
```

## Built With

- [Next.js](https://nextjs.org/)
- [react-query](https://react-query.tanstack.com/)
- [TypeScript](https://www.typescriptlang.org/)
