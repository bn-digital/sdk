import { createContext, FC, useContext, useState } from 'react'

enum TokenStorage {
  KEY = 'jwt',
}

const defaultValue: Api.TokenContextProps = {
  token: '',
  setToken: () => undefined,
}

const TokenContext = createContext<Api.TokenContext>(defaultValue)

const TokenProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string>(() => {
    const value = window.localStorage.getItem(TokenStorage.KEY)
    return !!value && value !== 'null' && value !== 'undefined' ? JSON.parse(value) : defaultValue.token
  })
  return <TokenContext.Provider value={{ token, setToken }}>{children}</TokenContext.Provider>
}

/**
 * Hook provides access to user entity (if authorized), token header value and login method (if unauthorized)
 */
export const useToken: () => Api.TokenContext = () => useContext<Api.TokenContext>(TokenContext)

export { TokenContext, TokenProvider }
