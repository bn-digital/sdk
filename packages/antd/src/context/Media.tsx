import { useMediaQuery } from 'react-responsive'

enum BreakpointMap {
  XS = 480,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1600,
}

const mediaQuery: typeof useMediaQuery = props => useMediaQuery(props)

type MediaHook = () => {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  mediaQuery: typeof mediaQuery
  breakpoints: typeof BreakpointMap
}

const useMedia: MediaHook = () => {
  const isMobile = useMediaQuery({ maxWidth: BreakpointMap.SM - 1 })
  const isTablet = useMediaQuery({ minWidth: BreakpointMap.SM, maxWidth: BreakpointMap.LG - 1 })
  const isDesktop = useMediaQuery({ minWidth: BreakpointMap.LG })
  return { isDesktop, isTablet, isMobile, mediaQuery, breakpoints: BreakpointMap }
}

export { useMedia, BreakpointMap }
