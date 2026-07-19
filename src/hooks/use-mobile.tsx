'use client';

import * as React from 'react';

const MOBILE_BREAKPOINT = 1024;

const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

/**
 * True below the desktop breakpoint.
 *
 * The viewport is an external store, so it is read with useSyncExternalStore
 * rather than mirrored into state from an effect. That removes the extra
 * render on mount and the synchronous setState inside an effect.
 *
 * There is no viewport during server rendering, so the server snapshot is
 * `false`. Prefer a CSS breakpoint over this hook whenever the choice is
 * purely presentational — CSS is correct on the very first paint, while this
 * hook can only be correct after hydration.
 */
export function useIsMobile() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
