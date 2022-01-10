import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { useToken } from '@bn-digital/graphql-client'
import { DataProxy, useLazyQuery } from '@apollo/client'
import Query = DataProxy.Query

interface UserContextProps<T> {
  user: T
  token: string
  authenticated: boolean | null
}

export interface UserQuery<T> extends Query<unknown, T> {}

const defaultValue: Readonly<UserContextProps<any>> = {
  token: '',
  user: {},
  authenticated: null,
} as const

const UserContext = createContext<UserContextProps<any>>(defaultValue)

type UserProviderProps<T> = PropsWithChildren<{
  query: UserQuery<T>
}>

export function UserProvider<T = any>({ query, children }: PropsWithChildren<UserProviderProps<T>>): JSX.Element {
  const [meQuery] = useLazyQuery(query.query)
  const { token, setToken } = useToken()
  const [user, setUser] = useState<T>()
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    !token && setAuthenticated(false)
  }, [token])

  useEffect(() => {
    token &&
      meQuery()
        .then(result => {
          result.error && setToken('')
          !result.error && !result.loading && result.data && setAuthenticated(true)
          return result.data
        })
        .then(profile => profile && setUser(profile))
        .catch(() => setToken(''))
  }, [meQuery, token])

  return (
    <UserContext.Provider
      value={{
        token,
        user: user ?? defaultValue.user,
        authenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

/**
 * Hook provides access to user entity (if authorized), token header value and login method (if unauthorized)
 */
export function useAuth<T>(): UserContextProps<T> {
  return useContext<UserContextProps<T>>(UserContext)
}
