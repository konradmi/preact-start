import type { Post } from '../types/post'

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div>
      <a href={`/posts/${post.id}`}>
        <h1>{post.title}</h1>
      </a>
      <p>{post.body}</p>
    </div>
  )
}

export default PostCard
