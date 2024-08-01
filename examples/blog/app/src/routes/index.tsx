import type { Post } from '../types/post'
import PostCard from '../components/PostCard'
import { useLoaderData } from 'preact-start/router'

export const loader = async () => {
  const posts = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json() as Post[]
  return {
    posts: posts.slice(15)
  }
}

const Index = () => {
  const { posts } = useLoaderData() as { posts: Post[] }
  return (
    <div>
      <h1>Welcome to the blog</h1>
      {
        posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      }
    </div>
  )
}

export default Index
