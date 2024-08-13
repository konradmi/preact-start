import { useLoaderData } from 'preact-start/router'
import { loadServerData } from '../utils'
import TodoComponent from '../components/Todo'
import type { Todo } from '../types'

export const loader = async () => {
  return loadServerData()
}

const TodoApp = () => {
  const todos = useLoaderData() as Todo[]
  return (
    <div>
      <h1>Todos</h1>
      {
        (todos || []).map(todo => (
          <TodoComponent key={todo.id} todo={todo} />
        ))
      }
    </div>
  )
}

export default TodoApp
