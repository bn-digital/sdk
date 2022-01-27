import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from 'react'
import { useToggle } from 'react-use'

type AppTheme = string | 'dark' | 'light'

type AppProps = {
  app: string
  i18n: { locale: string; setLocale: Dispatch<SetStateAction<string>> }
  burger: { opened: boolean; toggle: VoidFunction }
  ui: { theme: AppTheme; setTheme: Dispatch<SetStateAction<AppTheme>> }
  user: { authenticated: boolean | null; role: string | null; tokenKey: string }
}

const defaultValue: AppProps = {
  app: window.location.hostname,
  i18n: { locale: 'en', setLocale: () => undefined },
  burger: { opened: false, toggle: () => undefined },
  ui: { theme: 'default', setTheme: () => undefined },
  user: { authenticated: null, role: null, tokenKey: `urn:app:${window.location.hostname}:jwt` },
}

const useApp = () => useContext<AppProps>(Context)

const Context = createContext<AppProps>(defaultValue)

const ContextProvider: FC<Partial<AppProps>> = ({ app = defaultValue.app, i18n = defaultValue.i18n, children }) => {
  const [locale, setLocale] = useState(i18n?.locale)
  const [opened, toggle] = useToggle(false)
  const [theme, setTheme] = useState<AppTheme>('light')
  const tokenKey = `urn:app:${app}:jwt`

  return (
    <Context.Provider
      value={{
        ...defaultValue,
        app,
        user: { ...defaultValue.user, tokenKey },
        ui: { theme, setTheme },
        i18n: { locale, setLocale },
        burger: { opened, toggle },
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { ContextProvider as AppContextProvider, Context as AppContext, useApp }
