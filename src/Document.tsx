import preact from 'preact'
import { Suspense } from 'preact/compat'

const Document = (props: {
  children: preact.ComponentChildren,
  manifest: object,
  assets: preact.ComponentChildren
  scriptTag: preact.ComponentChildren
}) => {
  return (
    <html>
      <head>
        <Suspense fallback={<></>}>
          {props.assets}
        </Suspense>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/x-icon" href="/app/public/favicon.ico"></link>
        <title>Vinxi Preact</title>
        <script dangerouslySetInnerHTML={{
          __html: `window.manifest = ${JSON.stringify(props.manifest)};`
        }}></script>
      </head>
      <body>
        <div id="app">{props.children}</div>
      </body>
      {props.scriptTag}
    </html>
  )
}

export default Document
