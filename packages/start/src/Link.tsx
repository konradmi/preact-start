import fileRoutes from "vinxi/routes"
import { extractParams, getLoaderForTheURL } from "./utils.js"
import { useContextData } from "./loader.js"

type LinkProps = {
  children: preact.ComponentChildren;
  to: string;
}

const Link = ({ children, to }: LinkProps) => {
  const context = useContextData()

  const handleClick = () => {
    const url = to
    const loaderAndPath = getLoaderForTheURL(fileRoutes, url)
    // start executing load for the next page and continue with the navigation
    context.setValue({
      data: null,
      loading: true,
      error: false
    })

    loaderAndPath?.loader?.require().loader({
      path: loaderAndPath.path,
      url,
      params: extractParams(url, loaderAndPath.path)
    }).then((res: any) => context.setValue({
      data: res,
      loading: false,
      error: false,
    }))
  }
  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
)}

export default Link;
