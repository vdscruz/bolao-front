import App, { AppContext, AppProps } from 'next/app'
import React from 'react'
import { StyleReset } from 'atomize';
import { Provider as StyletronProvider } from 'styletron-react'
import { styletron } from '../../styletron'
import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak/ssr'
import keycloakCfg from '../../keycloak.config.json';
import cookie from 'cookie'
import type { IncomingMessage } from 'http'

interface InitialProps {
  cookies: unknown
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  return (
    <StyletronProvider value={styletron}>
      <StyleReset />
      <SSRKeycloakProvider
        keycloakConfig={keycloakCfg}
        persistor={SSRCookies(cookies)}
      >
        <Component {...pageProps} />
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