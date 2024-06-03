import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import { ThreeDots } from 'react-loader-spinner';
import '../../src/index.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.REACT_APP_API_URL + '/todos';

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                setTodos(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const addTodo = (text) => {
        setLoading(true);
        axios.post(API_URL, { text })
            .then(response => {
                setTodos([...todos, response.data]);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    const deleteTodo = (id) => {
        setLoading(true);
        axios.delete(`${API_URL}/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo.id !== id));
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    return (
        <div>
            <h1>Todo List</h1>
            <AddTodo addTodo={addTodo} />
            {loading ? (
                <div className="loader">
                    <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#00BFFF"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                    />
                </div>
            ) : (
                todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
                ))
            )}
        </div>
    );
};

export default TodoList;
