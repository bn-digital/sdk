import { ApolloClient, ApolloClientOptions, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import fetch from 'cross-fetch'

function createClient({ uri = '/graphql', link, ...options }: Partial<ApolloClientOptions<NormalizedCacheObject>>, production = true) {
  return new ApolloClient({
    link: link ?? createHttpLink({ fetch, uri }),
    connectToDevTools: !production,
    queryDeduplication: true,
    cache: new InMemoryCache({  resultCaching: production }),
    ...options,
  })
}

export { createClient }
