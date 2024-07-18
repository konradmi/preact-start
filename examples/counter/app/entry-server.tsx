import { eventHandler } from "vinxi/http"
import { startServer } from 'preact-start/server'

export default eventHandler(async (event) => {
  return await startServer(event)
})
