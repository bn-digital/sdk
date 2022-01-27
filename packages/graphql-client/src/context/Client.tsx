import { ApolloClientOptions, ApolloLink, ApolloProvider, createHttpLink, NormalizedCacheObject } from '@apollo/client'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { TokenProvider, useToken } from './Token'
import { createClient } from '../createClient'
import { setContext } from '@apollo/client/link/context'
import fetch from 'cross-fetch'
import { CookiesProvider } from 'react-cookie'
import { onError } from '@apollo/client/link/error'

interface ClientProvider extends ApolloClientOptions<NormalizedCacheObject> {
  production?: boolean
}

export interface ClientProviderProps extends PropsWithChildren<Partial<ClientProvider>> {}

export const ClientProvider: FC<ClientProviderProps> = ({ uri = '/graphql', production = true, children, ...props }) => {
  const { token } = useToken()

  const [link, setLink] = useState<ApolloLink>(
    createHttpLink({
      fetch,
      uri,
    }),
  )

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log([`[GraphQL Error]: Message: ${message}`, locations && `Location: ${locations}`, path && `Path: ${path}`].filter(Boolean).join(',')),
      )
    if (networkError) console.log(`[Network Error]: ${networkError}`)
  })

  useEffect(() => {
    token &&
      setLink(prevLink =>
        setContext((_, { headers }) => ({
          headers: { ...headers, Authorization: `Bearer ${token}` },
        })).concat(prevLink),
      )
  }, [token])

  const client = createClient(
    {
      ...props,
      link: errorLink.concat(link),
    },
    production,
  )

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default (props: ClientProviderProps) => (
  <CookiesProvider>
    <TokenProvider type={'jwt'}>
      <ClientProvider {...props} />
    </TokenProvider>
  </CookiesProvider>
)
