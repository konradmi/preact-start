import { useContextData } from "./loader";

type LazyRouteWrapperProps = {
  children: preact.ComponentChildren;
}

const LazyRouteWrapper = ({ children }: LazyRouteWrapperProps) => {
  const context = useContextData()

  if (context.value.loading) return 'Loading....'
  if (context.value.error) return 'Error!'
  return children
}

export default LazyRouteWrapper
