export default function() {
  return {
    isMobile: computed(() => useViewport().isLessThan('mobile')),
    isTablet: computed(() => useViewport().isLessThan('tablet')),
    isTabletS: computed(() => useViewport().isLessThan('tabletSmall')),
    isDesktop: computed(() => useViewport().isLessThan('desktop')),
  };
}