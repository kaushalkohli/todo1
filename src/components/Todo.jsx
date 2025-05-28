import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './Todo.css'

function Todo() {
    let [todos, settodos] = useState([]);
    let [newtodo, setnewtodo] = useState("");

    const handleInputChange = (e) => {
        setnewtodo(e.target.value);
    }

    const addNewTask = (e) => {
        e.preventDefault();
        if (newtodo.trim() !== "") {
            settodos((prevtodos) =>{
                return [...prevtodos, {
                    id: uuidv4(), 
                    text: newtodo, 
                    isDone: false,
                    createdAt: new Date()
                }]
            });
            setnewtodo("");
        } else {
            alert("Please enter a task.");
        }
    }

    let getCurrentDate = () => {
        const option = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString('en-us',option)
    }

    const deleteTask = (id) => {
        settodos((prevtodos) => prevtodos.filter((todo) => todo.id !== id));
    }

    const markAsDone = (id) => {
        settodos((prevtodos) =>
            prevtodos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    }

    const markAllDone = () => {
        settodos((prevtodos) =>
            prevtodos.map((todo) => ({ ...todo, isDone: true }))
        );
    }

    const clearCompleted = () => {
        settodos((prevtodos) => prevtodos.filter((todo) => !todo.isDone));
    }

    const stats = {
        total: todos.length,
        completed: todos.filter(todo => todo.isDone).length,
        active: todos.filter(todo => !todo.isDone).length
    };

    return (
        <div className="todo-container">
            <h1 className="todo-header">Todo List</h1>
            <div className='current-date'>
                {getCurrentDate()}
            </div>
            <div className="todo-input-container">
                <input 
                    className="todo-input"
                    type="text" 
                    placeholder="Add a new task..." 
                    value={newtodo}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && addNewTask(e)}
                />
                <button className="btn btn-add" onClick={addNewTask}>Add Task</button>
            </div>

            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        <span 
                            className="todo-text"
                            style={todo.isDone ? {textDecoration:"line-through"} : {}}
                        >
                            {todo.text}
                        </span>
                        <button 
                            className="btn btn-done" 
                            onClick={() => markAsDone(todo.id)}
                        >
                            {todo.isDone ? 'Undo' : 'Done'}
                        </button>
                        <button 
                            className="btn btn-delete" 
                            onClick={() => deleteTask(todo.id)}
                        >Delete</button>
                    </li>
                ))}
            </ul>

            <div className="todo-stats">
                <p>Total: {stats.total} | Active: {stats.active} | Completed: {stats.completed}</p>
            </div>
            <div className='btn-row'>
                <button className="btn btn-all-done" onClick={markAllDone}>
                    <span>Mark All as Done</span>
                </button>
                <button className="btn btn-delete" onClick={clearCompleted}>
                    <span>Clear Completed</span>
                </button>
            </div>
            
        </div>
    )
}

export default Todo