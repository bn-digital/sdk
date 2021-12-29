import { ApolloClientOptions, ApolloProvider, createHttpLink, NormalizedCacheObject } from '@apollo/client'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { setContext } from '@apollo/client/link/context'
import { TokenProvider, useToken } from './Token'
import { createClient } from '../createClient'

interface ClientProvider extends ApolloClientOptions<NormalizedCacheObject> {
  production?: boolean
}

export interface ClientProviderProps extends PropsWithChildren<Partial<ClientProvider>> {}

export const ClientProvider: FC<ClientProviderProps> = ({ uri = '/graphql', production = true, children, ...props }) => {
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

  const client = createClient({ ...props, link }, production)

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default (props: ClientProviderProps) => (
  <TokenProvider type={'jwt'}>
    <ClientProvider {...props} />
  </TokenProvider>
)
