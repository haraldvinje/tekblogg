import { useSyncExternalStore } from 'react'

const subscribeToNothing = () => () => {}

// False on the server and during hydration, true afterwards, so client-only
// output never causes a hydration mismatch.
export const useIsClient = () =>
  useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  )
