export function TodoItem({ completed, id, title,toggleTodo, deleteTodo }) {
    return (
        <li>
            <button onClick={() => deleteTodo(id)} 
            className='delete-btn'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.5 16.084l-1.403 1.416-4.09-4.096-4.102 4.096-1.405-1.405 4.093-4.092-4.093-4.098 1.405-1.405 4.088 4.089 4.091-4.089 1.416 1.403-4.092 4.087 4.092 4.094z"/></svg>
            </button>
            <input type="checkbox" checked={completed} 
            onChange={e => toggleTodo(id, e.target.checked)}/>
             <label htmlFor={`checkbox-${id}`} 
             onClick={() => toggleTodo(id, !completed)}>
                {title}
            </label>
        </li>
    )
}