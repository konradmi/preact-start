import { eventHandler, H3Event } from "vinxi/http"
import { getManifest } from "vinxi/manifest"
import { renderToStringAsync } from "preact-render-to-string"
import Document from "../Document"
import App from "../App"
import { createAssets } from '../assets' 
import { SSRRedirect } from '../types'

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

  try {
    const renderedApp = await renderToStringAsync(
      <Document manifest={manifest} assets={<Assets/>} scriptTag={scriptTag}>
        <App url={event.node.req.url}/>
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

export type APIEvent = H3Event & { params: Record<string, string> }
