import type { LoaderArgs } from 'preact-start/types'
import { useLoaderData } from 'preact-start/router'

import type { Post } from '../../types/post'

export const loader = async ({ params }: LoaderArgs) => {
  console.log('params', params)
  const post = await (await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)).json() as Post
  return {
    post
  }
}

const Post = () => {
  const { post } = useLoaderData() as { post: Post }
  return (
    <div>
      <h1>Post {post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}

export default Post
