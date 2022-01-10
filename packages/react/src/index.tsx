import { RoutingProvider } from './context/Routing'
import { render } from 'react-dom'
import { StrictMode } from 'react'

type AppOptions = {
  selector: string
  strict: boolean
}

const defaultOptions: AppOptions = { selector: '#root', strict: false }

/**
 * @param children
 * @param {AppOptions} options
 */
function renderApp(children: JSX.Element, options?: Partial<AppOptions>): void {
  const { selector, strict } = { ...defaultOptions, ...options }
  const App = strict ? () => <StrictMode>{children}</StrictMode> : () => children
  const element = selector ? document.querySelector(selector) : document.body.firstElementChild
  render(<App />, element)
}

export { renderApp, RoutingProvider }
