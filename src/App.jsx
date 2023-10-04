import { useEffect, useState } from 'react'
import './App.css'
import { NewTodoForm } from './assets/components/NewTodoForm'
import { TodoList } from './assets/components/TodoList'

export default function App() {
const [todos, setTodos] = useState(() => {
  const localValue = localStorage.getItem("Items")
  if (localValue == null ) return []
  
  return JSON.parse(localValue)
})

useEffect(() => {
  localStorage.setItem("Items", JSON.stringify(todos))
}, [todos])

function addTodo(title) {
  setTodos(currentTodos => {
    return [
      ...currentTodos,
      {
        id: crypto.randomUUID(),
        title,
        completed: false
      },
    ]
  })
}

function toggleTodo(id, completed) {
  setTodos(currentTodos => {
    return currentTodos.map(todo => {
      if (todo.id === id) {
        return {...todo, completed}
      }
      return todo
    })
  })
}

function deleteTodo(id) {
  setTodos(currentTodos => {
    return currentTodos.filter(todo => todo.id !== id)
  })
}

return (
    <section class="todo-container">
      <NewTodoForm onSubmit={addTodo} />
      <div className='todo-inner-container'>
        {todos.length === 0 ? null : <h2>Todo List</h2>}
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </div>
    </section>
  )
}

