import type { LoaderArgs } from 'preact-start/types'
import { useLoaderData } from 'preact-start/router'
import { Link } from 'preact-router/match'

import type { Post } from '../../types/post'

export const loader = async ({ params }: LoaderArgs) => {
  const post = await (await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)).json() as Post
  return {
    post
  }
}

const Post = () => {
  const { post } = useLoaderData() as { post: Post }
  return (
    <div>
      <Link href='/'>Home</Link>
      <h1>Post {post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}

export default Post
