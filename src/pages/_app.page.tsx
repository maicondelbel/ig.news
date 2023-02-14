import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Header } from '../components/Header'
import { GlobalStyle } from '../styles/global'
import { defaultTheme } from './../styles/theme/default'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <SessionProvider session={session}>
          <Header />
          <GlobalStyle />
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </>
  )
}
