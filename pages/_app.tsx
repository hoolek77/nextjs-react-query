import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from 'react'

import type { AppProps } from 'next/app'

import { GlobalStyle } from '@/styles/global'
import { ThemeProvider } from '@/theme/theme-provider'

import { Poppins } from '@next/font/google'

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <GlobalStyle />
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}
