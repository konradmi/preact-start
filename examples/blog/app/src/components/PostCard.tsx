import { Link } from 'preact-start/router'

import type { Post } from '../types/post'

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div>
      <Link to={`/posts/${post.id}`}>
        <h1>{post.title}</h1>
      </Link>
      <p>{post.body}</p>
    </div>
  )
}

export default PostCard
