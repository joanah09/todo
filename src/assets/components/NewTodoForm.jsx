import { useState, useRef } from "react"

export function NewTodoForm({ onSubmit }) {
    const [newItem, setNewItem] = useState("")
    const inputRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault()
        if(newItem === "") return
        onSubmit(newItem)
        setNewItem('')
    }

    return (
        <form onSubmit={handleSubmit} className="new-item-form todo-inner-container">
        <label htmlFor="item">My Todo List</label>
        <div className='form-row'>
          <input type="text" 
            id="item" 
            onChange={e => setNewItem(e.target.value)} 
            value={newItem}
            ref={inputRef} />
            <button className="add-btn">ADD</button>
          </div>
      </form>
    )

}