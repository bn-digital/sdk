import { createContext, Dispatch, FC, useContext, useEffect, useState } from 'react'
import decode from 'jwt-decode'
import { useCookies } from 'react-cookie'

type TokenType = 'jwt' | 'unknown'

type PayloadType = Record<string, string | number | boolean | null | undefined>

type TokenProviderProps<T = PayloadType> = {
  type: TokenType
  token: string
  key: string
  payload: T
}

export interface TokenContextProps<T = any> extends TokenProviderProps<T> {
  setToken: Dispatch<string>
}

const defaultValue: Readonly<TokenContextProps> = {
  token: '',
  key: 'jwt',
  payload: null,
  setToken: () => undefined,
  type: 'jwt',
} as const

const TokenContext = createContext<TokenContextProps>(defaultValue)

export const TokenProvider: FC<Partial<TokenProviderProps>> = ({ type = defaultValue.type, key = defaultValue.key, children }) => {
  const [token, addCookie, removeCookie] = useCookies([key])
  const [payload, setPayload] = useState()

  const setToken: Dispatch<string> = (token: string | null | undefined) => {
    token
      ? addCookie(key, token, {
          expires: new Date(Date.now() + 3600 * 24 * 30 * 1000),
          path: '/',
          sameSite: 'strict',
        })
      : removeCookie(key)
  }

  useEffect(() => {
    if (token[key] && type === 'jwt') {
      try {
        setPayload(decode(token[key]))
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
        key,
        token: token[key],
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
