import fileRoutes from "vinxi/routes";
import { createRouter } from 'radix3'
import { eventHandler } from "vinxi/http"
import { HTTPMethod, APIEvent } from "./types.js"

const router = createRouter()

for (const route of fileRoutes) {
  router.insert(route.path, route)
}

export const startApiServer = () => eventHandler(async (event) => {
  const { node } = event;
  const { req, res } = node;

  const match = router.lookup(new URL(req.url!, 'http://domain').pathname);

  if (match) {
    const mod = match[`$${req.method}`].import;
    const route = await mod();
    const handler = route[req.method as HTTPMethod];
    (event as APIEvent).params = match.params || {}
    return handler(event);
  }

  res.statusCode = 404;
  res.end();
})
