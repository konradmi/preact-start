import { useState } from 'preact/hooks'

import './Counter.css'

type CounterProps = {
  posts: { title: string, body: string }[]
}

export const loader = async () => {
  const posts = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json() as {title: string, body: string }[]
  return {
    posts: posts.slice(2)
  }
}

export default function Counter({ posts }: CounterProps) {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div className='Counter'>
      <h1>{JSON.stringify(posts).slice(0, 100)}</h1>
      <div className='Counter__nav'>
        <a href='/about'>About</a>
      </div>
      <div className='Counter__control'>
        <p className='Counter__control__count'>{count}</p>
        <button className='Counter__control__btn' onClick={handleClick}>+</button>
      </div>
    </div>
  )
}
