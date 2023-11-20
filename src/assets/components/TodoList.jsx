import { TodoItem } from "./TodoItem"

export function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
    return (
        <ul className='list'>
        <p>{todos.length === 0 && "List is empty"}</p>
        {todos.map(todo => {
          return (
            <TodoItem 
            {...todo}
            key={todo.id} 
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            />
          )
        })}
      </ul>
    )
}