import type { ReactElement } from 'react'

import { theme } from './theme'

import { ThemeProvider as StyledThemeProvider } from 'styled-components'

export const ThemeProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[]
}) => {
  return (
    <>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </>
  )
}
