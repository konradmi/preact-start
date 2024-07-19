// @ts-expect-error - this package is not typed
import { createApp } from "vinxi";
import { preact } from "@preact/preset-vite";
import { MyFileSystemRouter } from "./fsRouter.js";
import { ApiRoutesRouting } from "./apiRouter.js";
import path from "path";
import { config } from "vinxi/plugins/config";
// @ts-expect-error - this package is not typed
import { serverFunctions } from "@vinxi/server-functions/plugin";

export const createPreactStartApp = () => {
  return createApp({
    routers: [
      {
        name: "public",
        type: "static",
        dir: "./app/public",
      },
      {
        name: "client",
        type: "client",
        handler: "./app/entry-client.tsx",
        // @ts-expect-error - this package is not typed
        routes: (router, app) => {
          return new MyFileSystemRouter(
            {
              dir: path.join(path.resolve(path.dirname('')), "./app/src/routes"),
              extensions: ["jsx", "tsx"],
            },
            router,
            app
          );
        },
        plugins: () => [preact(), serverFunctions.client()],
        target: "browser",
        base: "/_build",
      },
      serverFunctions.router(),
      {
        name: "api",
        type: "http",
        handler: "./app/entry-api-server.tsx",
        base: "/api",
        // @ts-expect-error - this package is not typed
        routes: (router, app) => {
          return new ApiRoutesRouting(
            {
              dir: path.join(path.resolve(path.dirname('')), "./app/src/routes/api"),
              extensions: ["ts", "js"],
            },
            router,
            app
          );
        },
        target: "server",
      },
      {
        name: "ssr",
        type: "http",
        handler: "./app/entry-server.tsx",
        // @ts-expect-error - this package is not typed
        routes: (router, app) => {
          return new MyFileSystemRouter(
            {
              dir: path.join(path.resolve(path.dirname('')), "./app/src/routes"),
              extensions: ["jsx", "tsx"],
            },
            router,
            app
          );
        },
        plugins: () => [preact(), config('server', {
          ssr: {
            noExternal: ['preact-start'],
          }
        })],
        target: "server",
      },
    ],
  })
}
