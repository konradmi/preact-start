import { useContextData } from "./loader";

type LazyRouteWrapperProps = {
  children: preact.ComponentChildren;
}

const LazyRouteWrapper = ({ children }: LazyRouteWrapperProps) => {
  const context = useContextData()

  if (context.value.loading) return null
  if (context.value.error) return null
  return children
}

export default LazyRouteWrapper
