import markerSDK from '@marker.io/browser'

async function initMarker(destination: string) {
  await markerSDK.loadWidget({
    destination,
  })
}

export { initMarker }
