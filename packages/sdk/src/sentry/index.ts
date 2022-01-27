import { init, BrowserOptions } from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
export { withProfiler, withErrorBoundary } from '@sentry/react'

function initSentry(options: BrowserOptions): void {
  if (!options.dsn || !options.enabled) return
  init({
    integrations: [new BrowserTracing()],
    autoSessionTracking: true,
    tracesSampleRate: 1.0,
    ...options,
  })
}

export { initSentry }
