"use server";

const serverTodoList = [
  {
    id: 1,
    text: 'todo1',
    completed: true
  },
  {
    id: 2,
    text: 'todo2',
    completed: false
  }
]

export const loadServerData = () => {
  console.log('loading server data', process.env.NODE_ENV)
  return serverTodoList
}

export const flipTodo = async (id: number) => {
  const todo = serverTodoList.find(todo => todo.id === id)
  if (!todo) {
    return
  }
  todo.completed = !todo.completed
  console.log('updated serverTodoList', serverTodoList)
  return todo
}
