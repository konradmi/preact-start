import { flipTodo } from '../utils'
import type { Todo } from '../types'

const Todo = ({ todo }: { todo: Todo }) => {
  const handleOnChange = async () => {
    const udpatedTodo = await flipTodo(todo.id)
    console.log('udpatedTodo', udpatedTodo)
  }
  return (
    <div>
      <input type="checkbox" checked={todo.completed} onChange={handleOnChange}/>
      <span>{todo.text}</span>
    </div>
  )
}

export default Todo
