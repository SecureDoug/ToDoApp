import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodosState] = useState([
    {
      toDoString: "Clean my desk",
      isCompleted: false
    },
    {
      toDoString: "Call Joe about new code",
      isCompleted: false
    },
    {
      toDoString: "Update jim on version info",
      isCompleted: false
    },
    {
      toDoString: "Put breakfast in the Fridge",
      isCompleted: false
    }
  ]);

  function Todo({ todo, index, completeTodo, removeTodo }) {
    return (
      <div className="todo" style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
        {todo.toDoString}
        <div>
          <button className="todoButton" onClick={() => completeTodo(index)}>Completed</button>
          <button className="todoButton" onClick={() => removeTodo(index)}>X</button>
        </div>
      </div>
    );
  }

  function Todos({ addTodo }) {
    const [value, setValue] = useState("");

    const submit = e => {
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue("");
    };

    return (
      <form onSubmit={submit}>
        <input type="text" className="input" value={value} onChange={e => setValue(e.target.value)} />
      </form>
    );
  }

  const addTodo = toDoString => {
    const todosArray = [...todos, { toDoString }];
    setTodosState(todosArray);
  };

  const removeTodo = index => {
    const todosArray = [...todos];
    todosArray.splice(index, 1);
    setTodosState(todosArray);
  };

  const completeTodo = index => {
    const todosArray = [...todos];
    todosArray[index].isCompleted = true;
    setTodosState(todosArray);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo key={index} index={index} todo={todo} completeTodo={completeTodo} removeTodo={removeTodo} />
        ))}
        <Todos addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;