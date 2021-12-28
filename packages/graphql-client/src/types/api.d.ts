namespace Api {
  import type { PropsWithChildren } from 'react'
  import type { ApolloClientOptions, NormalizedCache } from '@apollo/client'
  import type { Dispatch, SetStateAction, Context } from 'react'

  export type TokenContextProps = {
    token: string
    setToken: Dispatch<SetStateAction<string>>
  }

  export type TokenContext = Context<TokenContextProps>

  export type ClientContextProps = ApolloClientOptions<NormalizedCache> & PropsWithChildren<{ production: boolean }>

  export type ClientContext = ClientContextProps & {
    production: boolean
  }
}
