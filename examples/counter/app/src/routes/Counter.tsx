import { useState } from 'preact/hooks'

import './Counter.css'

export default function Counter() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div className='Counter'>
      <div className='Counter__control'>
        <p className='Counter__control__count'>{count}</p>
        <button className='Counter__control__btn' onClick={handleClick}>+</button>
      </div>
    </div>
  )
}
