import { useState, useEffect } from 'react';

/**
 * Returns true only after the component has mounted on the client.
 * Use this to guard Zustand persist store values that differ between
 * server (empty defaults) and client (rehydrated from localStorage).
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
