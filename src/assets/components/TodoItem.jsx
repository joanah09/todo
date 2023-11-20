import { useState, useEffect, useRef } from "react";

export function TodoItem({ completed, id, title, toggleTodo, deleteTodo, editTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [tempEditedTitle, setTempEditedTitle] = useState(""); 
    const todoItemRef = useRef(null);

    useEffect(() => {
        const storedTodo = localStorage.getItem(`todo-${id}`);
        if (storedTodo) {
            const parsedTodo = JSON.parse(storedTodo);
            if (parsedTodo && parsedTodo.title) {
                setEditedTitle(parsedTodo.title);
            }
        }
    }, [id]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (todoItemRef.current && !todoItemRef.current.contains(event.target)) {
                setIsEditing(false);
                setTempEditedTitle("");
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
        setTempEditedTitle(editedTitle);
        setTempEditedTitle("");
    };

    const handleSaveClick = () => {
        if (typeof editTodo === "function") {
            editTodo(id, tempEditedTitle); 
        }
        setIsEditing(false);
        setEditedTitle(tempEditedTitle); 
        localStorage.setItem(`todo-${id}`, JSON.stringify({ id, title: tempEditedTitle, completed }));
    };

    const handleInputChange = (e) => {
        setTempEditedTitle(e.target.value);
    };

    return (
        <li ref={todoItemRef}>
            <button onClick={() => deleteTodo(id)} className="delete-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.5 16.084l-1.403 1.416-4.09-4.096-4.102 4.096-1.405-1.405 4.093-4.092-4.093-4.098 1.405-1.405 4.088 4.089 4.091-4.089 1.416 1.403-4.092 4.087 4.092 4.094z"/></svg>
            </button>
            <input type="checkbox" checked={completed} onChange={(e) => toggleTodo(id, e.target.checked)} />

            {isEditing ?
            <input
                className="content-label"
                type="text"
                value={tempEditedTitle}
                onChange={handleInputChange}
                autoFocus
            />
            :
            <label htmlFor={`checkbox-${id}`} onClick={() => toggleTodo(id, !completed)}>
                {editedTitle || title}
            </label>
            }

            {isEditing ?
            <button onClick={handleSaveClick} className="edit-btn">save</button>
            : 
            <button onClick={handleEditClick} className="edit-btn">edit</button>
            }
        </li>
    );
}
