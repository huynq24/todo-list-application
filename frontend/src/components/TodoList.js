import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import '../../src/index.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL + '/todos'; // Replace with your Vercel URL

    useEffect(() => {
        axios.get(API_URL)
            .then(response => setTodos(response.data))
            .catch(error => console.error(error));
    }, []);

    const addTodo = (text) => {
        axios.post(API_URL, { text })
            .then(response => setTodos([...todos, response.data]))
            .catch(error => console.error(error));
    };

    const deleteTodo = (id) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <AddTodo addTodo={addTodo} />
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
            ))}
        </div>
    );
};

export default TodoList;
