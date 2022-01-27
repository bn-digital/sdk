import { RoutingProvider } from './context/Routing'
import { useApp, AppContextProvider, AppContext } from './context/App'
import { render } from 'react-dom'
import { FC, StrictMode, VFC } from 'react'

type AppOptions = {
  selector: string
  strict: boolean
}

const defaultOptions: AppOptions = { selector: '#root', strict: false }

function withStrictMode<T>(Wrapped: FC<T>, enable = false): FC<T> {
  return props =>
    enable ? (
      <StrictMode>
        <Wrapped {...props} />
      </StrictMode>
    ) : (
      <Wrapped {...props} />
    )
}

/**
 * @param Component
 * @param options
 */
function renderApp(Component: VFC, options?: Partial<AppOptions>): void {
  const { selector, strict } = { ...defaultOptions, ...options }
  const App = withStrictMode(Component, strict)
  const container = selector ? document.querySelector(selector) : document.body.firstElementChild
  render(<App />, container)
}

export { renderApp, RoutingProvider, AppContextProvider, useApp, AppContext }
