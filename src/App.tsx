import { Router, Route } from 'preact-router'
import { Suspense } from 'preact/compat'
import { getManifest } from "vinxi/manifest"
import fileRoutes from "vinxi/routes";
import lazyRoute from './lazyRoute'


type AppProps = {
  url?: string // url defined means SSR mode.
}

const clientManifest = getManifest("client");
const serverManifest = getManifest("ssr");

const App = ({ url }: AppProps) => {
  return (
    <Suspense fallback={<></>}>
      <Router url={url}>
        {
          fileRoutes.map(route => <Route key={route.path} path={route.path} component={lazyRoute(route.$component, route.$$loader, clientManifest, serverManifest)} />)
        }
      </Router>
    </Suspense>
  )
}

export default App;
