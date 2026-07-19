"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * localStorage-backed preferences, exposed through useSyncExternalStore.
 *
 * Reading in an effect and calling setState would work, but it cascades an
 * extra render on every mount and trips react-hooks/set-state-in-effect.
 * Treating storage as what it actually is — an external store — gives the
 * server its default, the client its stored value, and no effect at all.
 */

const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  // `storage` only fires in *other* tabs, so it keeps duplicate tabs in sync;
  // same-tab writes notify through `emit`.
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function emit() {
  listeners.forEach((listener) => listener());
}

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies).
    return null;
  }
}

function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // The preference simply will not survive a reload.
  }
  emit();
}

/**
 * A preference persisted to localStorage. `parse` maps the raw stored string
 * to a valid value, and is responsible for rejecting anything unrecognised.
 */
export function usePersistedPreference<T>(
  key: string,
  fallback: T,
  parse: (raw: string | null) => T,
): [T, (value: T) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => parse(read(key)),
    () => fallback,
  );

  const setValue = useCallback(
    (next: T) => write(key, String(next)),
    [key],
  );

  return [value, setValue];
}

const neverChanges = () => () => {};

/**
 * False during server render and hydration, true afterwards. Used to hold back
 * width/margin transitions until the stored layout is in place, so the shell
 * does not animate open on every page load.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    neverChanges,
    () => true,
    () => false,
  );
}
