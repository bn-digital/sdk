import markerSDK from '@marker.io/browser'

interface WidgetOptions {
  destination: string
  silent: boolean
  customData: Record<string, String | Number | Boolean | Object | Array<String>>
  ssr: { renderDelay: number }
  reporter: { email: string; fullName: string }
}

type Options = Partial<WidgetOptions> & Pick<WidgetOptions, 'destination'> & { enabled?: boolean }

const defaultOptions: Readonly<Options> = { enabled: process.env.NODE_ENV === 'production' ?? false, destination: '' } as const

async function initMarker(options: Options = defaultOptions) {
  const { enabled, ...widgetOptions } = options
  if (!widgetOptions.destination || !enabled) return
  try {
    await markerSDK.loadWidget(widgetOptions)
  } catch (e) {
    console.log(e)
  }
}

export { initMarker }
