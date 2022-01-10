import { useMediaQuery } from 'react-responsive'

enum BreakpointMap {
  XS = 480,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1600,
}

const useMedia = () => {
  const isMobile = useMediaQuery({ maxWidth: BreakpointMap.SM - 1 })
  const isTablet = useMediaQuery({ minWidth: BreakpointMap.SM, maxWidth: BreakpointMap.LG - 1 })
  const isDesktop = useMediaQuery({ minWidth: BreakpointMap.LG })
  return { isDesktop, isTablet, isMobile, BreakpointMap }
}

export { useMedia, BreakpointMap }
