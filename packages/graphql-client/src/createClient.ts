import { ApolloClient, ApolloClientOptions, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

function createClient(options: Partial<ApolloClientOptions<NormalizedCacheObject>>, production = true) {
  return new ApolloClient({
    uri: '/graphql',
    connectToDevTools: !production,
    queryDeduplication: true,
    cache: new InMemoryCache({ resultCaching: production }),
    ...options,
  })
}

export { createClient }
