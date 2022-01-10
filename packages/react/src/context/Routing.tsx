import { Context, createContext, FC, useContext, VFC } from 'react'
import { BrowserRouter, RouteObject, useRoutes } from 'react-router-dom'

export type PageRoutes<T> = {
  [key: string]: Partial<{ path: string; element: JSX.Element; children: { [key in keyof T]: RouteObject } }>
}

const defaultRoutes: PageRoutes<any> = {
  '': { children: { 404: { path: '*', element: <div /> } } },
}

const Context = createContext(defaultRoutes)

type PagesProps<T> = {
  router: FC
  routes: PageRoutes<T>
}

const Pages: VFC = () => {
  const routes = useContext(Context)
  return useRoutes(Object.values(routes).map(it => ({ ...it, children: it.children && Object.values(it.children) })))
}

const useRoute = () => useContext(Context)

function RoutingProvider<T>({ router: Router = BrowserRouter, routes = defaultRoutes }: Partial<PagesProps<T>>) {
  return (
    <Context.Provider value={routes}>
      <Router>
        <Pages />
      </Router>
    </Context.Provider>
  )
}

export { Pages, RoutingProvider, useRoute }
