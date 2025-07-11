import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodos([...todos, { text: input, completed: false }]);
      setInput("");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="image-animations">
    {Array.from({ length: 60}).map((_, i) => (
      <div key={`star-${i}`} className="shape star"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }}
      ></div>
    )) }

    {Array.from({ length: 30}).map((_, i) => (
      <div key={`hex-${i}`} className="shape hexagon"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${5 + Math.random() * 5}s`
        }}
      ></div>
    ))}
  </div>
      <div className="todo-container">
        <h1>
          FOCUSFLOW TODO LIST <span className="checkmark">✅</span>
        </h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Add a new todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <input type="checkbox" />
              <span>{todo.text}</span>
              <button className="delete-icon" onClick={() => deleteTodo(index)}>
              <i className="bi bi-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
