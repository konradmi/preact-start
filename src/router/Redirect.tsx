import { useEffect } from 'preact/hooks'
import { route } from 'preact-router'

import { SSRRedirect } from '../types.js'

const Redirect = ({ to, replace = true }: { to: string, replace?: boolean }) => {
  useEffect(() => {
    route(to, replace)
  }, [to, replace])

  if (import.meta.env.SSR) {
    throw new SSRRedirect(to)
  } 
  return <div/>
}

export default Redirect
