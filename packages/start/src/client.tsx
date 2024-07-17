import { hydrate } from 'preact'
import App from './App.js'

export const startClient = () => {
  const root = document.getElementById('app')!

  hydrate(<App/>, root);
}
