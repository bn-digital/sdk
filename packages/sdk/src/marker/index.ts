import markerSDK from '@marker.io/browser'

interface WidgetOptions {
  destination: string
  silent: boolean
  customData: Record<string, String | Number | Boolean | Object | Array<String>>
  ssr: { renderDelay: number }
  reporter: { email: string; fullName: string }
}

type Options = WidgetOptions

async function initMarker(options: Options) {
  if (!options.destination) return
  try {
    await markerSDK.loadWidget(options)
  } catch (e) {
    console.log(e)
  }
}

export { initMarker }
