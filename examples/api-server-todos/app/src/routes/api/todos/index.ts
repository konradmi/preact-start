import { getQuery } from 'vinxi/http'
import { todos } from '../../../utils/todos'
import { APIEvent } from 'preact-start/types'

export const GET = async (event: APIEvent) => {
  const query = getQuery(event)
  const completed = query.completed === 'true'
  
  event.node.res.setHeader("Content-Type", "application/json")
  if (!query.completed) return await todos
  return await todos.then(todos => todos.filter(todo => todo.completed === completed))
}
