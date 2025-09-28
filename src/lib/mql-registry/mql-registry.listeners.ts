export function addChangeListenerToMql(mql: MediaQueryList, onChange: (event?: MediaQueryListEvent) => void): void {
  if (typeof mql.addEventListener === 'function') {
    // Modern browsers
    mql.addEventListener('change', onChange);
  } else {
    // Legacy fallback (Safari < 14)
    (mql as any).addListener(onChange);
  }
}

export function removeChangeListenerFromMql(
  mql: MediaQueryList,
  onChange: (event?: MediaQueryListEvent) => void
): void {
  if (typeof mql.removeEventListener === 'function') {
    // Modern browsers
    mql.removeEventListener('change', onChange);
  } else {
    // Legacy fallback (Safari < 14)
    (mql as any).removeListener(onChange);
  }
}
