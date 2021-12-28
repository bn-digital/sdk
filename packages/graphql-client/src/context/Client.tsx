import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { FC, useEffect, useState } from 'react'
import { setContext } from '@apollo/client/link/context'
import { TokenProvider, useToken } from './Token'

const ClientProvider: FC<Api.ClientContextProps> = ({ uri = '/graphql', production = false, children, ...props }) => {
  const { token } = useToken()

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

  const client = new ApolloClient({
    link,
    queryDeduplication: true,
    cache: new InMemoryCache({ resultCaching: production }),
    connectToDevTools: !production,
    ...props,
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
export default (props: Api.ClientContextProps) => (
  <TokenProvider>
    <ClientProvider {...props} />
  </TokenProvider>
)

export { ClientProvider }
