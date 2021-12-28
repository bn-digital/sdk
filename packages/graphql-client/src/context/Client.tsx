import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { FC, useEffect, useMemo, useState } from 'react'
import { setContext } from '@apollo/client/link/context'
import { TokenProvider, useToken } from './Token'
import { onError } from '@apollo/client/link/error'

const ClientProvider: FC<Api.ClientContextProps> = ({ uri = '/graphql', production = false, children, ...props }) => {
  const { token } = useToken()

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`))
    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  const [link, setLink] = useState(createHttpLink({ fetch, uri }))

  useEffect(() => {
    token &&
      setLink(prevLink =>
        setContext((_, { headers }) => ({
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          },
        })).concat(prevLink),
      )
  }, [token])

  const client = useMemo(
    () =>
      new ApolloClient({
        link,
        queryDeduplication: true,
        cache: new InMemoryCache({ resultCaching: production }),
        connectToDevTools: !production,
        ...props,
      }),
    [link],
  )

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
export default (props: Api.ClientContextProps) => (
  <TokenProvider>
    <ClientProvider {...props} />
  </TokenProvider>
)

export { ClientProvider }
