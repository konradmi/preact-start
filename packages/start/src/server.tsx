import { eventHandler } from "vinxi/http"
import { getManifest } from "vinxi/manifest"
import { renderToStringAsync } from "preact-render-to-string"
import Document from "./Document.js"
import App from "./App.js"
import { createAssets } from "./assets.js"
import { SSRRedirect } from "./types.js"
import { extractParams, getLoaderForTheURL } from "./utils.js";
import { LoaderDataProvider } from "./loader.js"
import fileRoutes from "vinxi/routes"

export const startServer = () => eventHandler(async (event) => {
  const clientManifest = getManifest("client");

  const clientHandler = clientManifest.inputs[clientManifest.handler]
  const scriptSrc = clientHandler.output.path;

  const manifest = await clientManifest.json()
  
  const Assets = createAssets(
    getManifest("client").handler,
    clientManifest,
  )

  const scriptTag = <script type="module" src={scriptSrc}></script>

  const url = event.node.req.url!
  const pathname = new URL(url, "http://domain").pathname
  const loaderAndPath = getLoaderForTheURL(fileRoutes, pathname)
  const loaderProps = await loaderAndPath?.loader?.require().loader({ path: loaderAndPath.path, url, params: extractParams(url, loaderAndPath.path) })

  const initialLoaderPropsTag = loaderProps ? <script dangerouslySetInnerHTML={{ __html: `window.__LOADER_PROPS__ = ${JSON.stringify(loaderProps)}` }}></script> : null
  try {
    const renderedApp = await renderToStringAsync(
      <Document manifest={manifest} assets={<Assets/>} scriptTag={scriptTag} initialLoaderPropsTag={initialLoaderPropsTag}>
        <LoaderDataProvider initialValue={loaderProps}>
          <App url={url}/>
        </LoaderDataProvider>
      </Document>
    );

    event.node.res.setHeader("Content-Type", "text/html");
    return renderedApp;
  } catch (e) {
    if (e instanceof SSRRedirect) {
      event.node.res.statusCode = 302;
      event.node.res.setHeader("Location", e.to);
      event.node.res.end();
    } else {
      throw e;
    }
  }
})
