# preact-start

A minimal Preact metaframework built on top of Vinxi and preact-router. It provides a simple way to create Preact applications with server-side rendering and routing. It features:
- Server-side rendering
- File-based routing
- API routes
- Server functions
- Data pre-loading
- TS support

## Examples

There are 3 examples available:
- [Counter](examples/counter/README.md)
- [Blog](examples/blog/README.md)
- [Api Server Todos](examples/api-server-todos/README.md)

## APIs

### Routing

#### File-based routing

Everything in the `app/src/routes` directory is automatically converted to routes. The file name is the route path and the default export is the component to render. For example, to create a route at `/about`, create a file `app/src/routes/about.tsx`. Note that only `.tsx` or `.jsx` files are supported.

Route params are also supported. For example, to create a route at `/user/:id`, create a file `routes/user/[id].tsx`.

#### Navigation

- Link

To navigate to a route, use the `Link` component from `preact-start/router`. The `to` prop should be the path to navigate to. If the `to` route exports `loader`, the loader will be called before the route is rendered.

- Redirect

To redirect to a route, use the `Redirect` component from `preact-start/router`. The `to` prop should be the path to redirect to. `Redirect` works on the server and on the client.

### API routes

Everything in the `app/src/routes/api` directory is automatically converted to API routes. The file name is the route path. The HTTP methods are determined by the named exports. For example, to create a route `GET /api/users`, create a file `app/src/routes/api/users.ts` and export a function named `GET`. 

The function received `APIEvent` as the first argument and should return a response object. `APIEvent` is a wrapper type around `H3Event` with route params.

```
import { APIEvent } from 'preact-start/types'
export const GET = async (event: APIEvent) => {}
```

To work with the event object, use the methods exposed by the [`vinxi/http` package](https://vinxi.vercel.app/api/server/request.html).

### Data pre-loading

To preload data for a route, export a function named `load` from the route component. The function receives an object of type `LoaderArgs` and should return a serializable object. To access the object from withiin the component use the `useLoaderData()` hook exposed by `preact-start/router`.
The function is called on the server before SSR, and the result is serialized and sent to the client.

```
import type { LoaderArgs } from 'preact-start/types'
import { useLoaderData } from 'preact-start/router'

export const loader = async ({ params }: LoaderArgs) => {
  const post = await (await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)).json()
  return { post }
}

const Post = () => {
  const { post } = useLoaderData()
  return (
    <div>
      <h1>Post {post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
```

The loader function is also called on the client on navigation before the next route is rendered. The next route will not be rendered until the loader function has resolved so the `useLoaderData()` hook will always return the fetched data.
