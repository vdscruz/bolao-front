import App, { AppContext, AppProps } from 'next/app'
import React from 'react'
import { StyleReset, ThemeProvider } from 'atomize';
import { Provider as StyletronProvider } from 'styletron-react'
import { styletron } from '../../styletron'
import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak/ssr'
import keycloakCfg from '../../keycloak.config.json';
import cookie from 'cookie'
import type { IncomingMessage } from 'http'
import { DefaultLayout } from '../components/gbs-layout';
import { Router } from 'next/dist/client/router';

interface InitialProps {
  cookies: unknown
}

const theme = {
  colors: {
    primary: '#605CFF',
    pvariant: '#0400F5',
    secondary: '#F7AC2C',
    svariant: '#F6A313',
    background: '#F1F1FE',
    surface: '#fff',
    onPrimary: '#fff',
    onSecondary: '#fff',
    onBackground: '#C0C1C7'
  }
}

function MyApp({ Component, pageProps, cookies, router }: AppProps & InitialProps) {

  let children = (
    <Component {...pageProps} />
  )

  if (router.pathname.match(/app/)) {
    children = (
      <DefaultLayout pageContext={{}}>
        <Component {...pageProps} />
      </DefaultLayout>
    )
  }

  return (

    <StyletronProvider value={styletron}>
      <StyleReset />
      <SSRKeycloakProvider
        keycloakConfig={keycloakCfg}
        persistor={SSRCookies(cookies)}
      >
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider >

      </SSRKeycloakProvider>
    </StyletronProvider>

  )
}

function parseCookies(req?: IncomingMessage) {
  if (!req || !req.headers) {
    return {}
  }
  return cookie.parse(req.headers.cookie || '')
}

MyApp.getInitialProps = async (context: AppContext) => {
  // Extract cookies from AppContext
  return {
    cookies: parseCookies(context?.ctx?.req),
  }
}

export default MyApp