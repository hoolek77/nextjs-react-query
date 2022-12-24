import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      neutral: string
      background: string
      textPrimary: string
      textSecondary: string
    }
  }
}
