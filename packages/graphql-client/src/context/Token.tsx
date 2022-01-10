import { createContext, Dispatch, FC, useContext, useEffect } from 'react'
import useLocalStorage from 'react-use-localstorage'
import decode from 'jwt-decode'

export enum LocalStorage {
  TOKEN_KEY = 'jwt',
}

type TokenType = 'jwt' | 'unknown'

type PayloadType = Record<string, string|number|boolean|null|undefined>

type TokenProviderProps<T = PayloadType> = {
  type: TokenType
  token: string
  payload: T
}

export interface TokenContextProps<T = any> extends TokenProviderProps<T> {
  setToken: Dispatch<string>
}

const defaultValue: Readonly<TokenContextProps> = {
  token: '',
  payload: null,
  setToken: () => undefined,
  type: 'unknown',
} as const

const TokenContext = createContext<TokenContextProps>(defaultValue)

export const TokenProvider: FC<Partial<TokenProviderProps>> = ({ type = 'jwt', children }) => {
  const [token, setToken] = useLocalStorage(LocalStorage.TOKEN_KEY)
  let payload = defaultValue.payload
  useEffect(() => {
    if (token && type === 'jwt') {
      try {
        payload = decode(token)
      } catch (e) {
        console.warn(e)
      }
    }
  }, [token])
  return (
    <TokenContext.Provider
      value={{
        type,
        payload,
        token,
        setToken,
      }}
    >
      {children}
    </TokenContext.Provider>
  )
}

/**
 * Hook provides access to user entity (if authorized), token header value and login method (if unauthorized)
 */
export function useToken<T = any>(): TokenContextProps<T> {
  return useContext<TokenContextProps>(TokenContext)
}
