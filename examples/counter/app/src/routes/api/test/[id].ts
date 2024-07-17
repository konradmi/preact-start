import { getRequestHeaders, getQuery } from 'vinxi/http'

import { APIEvent } from '../../../../../framework/types'

export const GET = async (event: APIEvent) => {
  const headers = getRequestHeaders(event);
  const query = getQuery(event);
  console.log('headers', headers)
  console.log('query', query)
  console.log('params', event.params)
  event.node.res.setHeader("Content-Type", "application/json");
  const posts = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json() as {title: string, body: string }[]
  return {
    posts: posts.slice(2)
  }
}
