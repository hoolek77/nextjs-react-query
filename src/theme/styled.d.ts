import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      secondary: string
      neutral: string
      background: string
      textPrimary: string
      textSecondary: string
      success: string
    }
  }
}
