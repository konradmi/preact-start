import { readBody, setResponseStatus } from "vinxi/http";
import { APIEvent } from 'preact-start/types'
import { todos } from '../../../utils/todos'

export const GET = async (event: APIEvent) => {
  const todoId = +event.params.id

  const todo = await todos.then(todos => todos.find(todo => todo.id === todoId))

  if (!todo) {
    setResponseStatus(event, 404)
    return 'Todo not found'
  }
  
  event.node.res.setHeader("Content-Type", "application/json")
  return todo
}

export const DELETE = async (event: APIEvent) => {
  const todoId = +event.params.id

  return await todos.then(todos => todos.filter(todo => todo.id !== todoId))
}

export const PATCH = async (event: APIEvent) => {
  const todoId = +event.params.id
  const body = await readBody(event)

  return await todos.then(todos => todos.map(todo => todo.id === todoId ? { ...todo, ...body } : todo))
}
