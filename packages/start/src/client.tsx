import { hydrate } from 'preact'
import App from './App.js'
import { LoaderDataProvider } from "./loader.js"
import type { LoaderData } from './loader.js'

declare global {
  interface Window {
    __LOADER_PROPS__: LoaderData
  }
}

export const startClient = () => {
  const root = document.getElementById('app')!

  hydrate(
    <LoaderDataProvider initialValue={window.__LOADER_PROPS__ || {}}>
      <App/>
    </LoaderDataProvider>,
    root
  );
}
