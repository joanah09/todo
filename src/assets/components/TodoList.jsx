import { TodoItem } from "./TodoItem"

export function TodoList({ todos, toggleTodo, deleteTodo }) {
    return (
        <ul className='list'>
        <span>{todos.length === 0 && "List is empty"}</span>
        {todos.map(todo => {
          return (
            <TodoItem 
            {...todo}
            key={todo.id} 
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo} 
            />
          )
        })}
      </ul>
    )
}