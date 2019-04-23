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

  const [completed, setCompletedState] = useState([]);

  const [isHidden, setHidden] = useState(true);

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

  function CompletedTodo({ todo, index, completeTodo, removeCompletedTodo }) {
    return (
      <div className="todo" style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
        {todo.toDoString}
        <div>
          <button className="todoButton" onClick={() => removeCompletedTodo(index)}>X</button>
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

  const removeCompetedTodo = index => {
    const completedTodosArray = [...completed];
    completedTodosArray.splice(index, 1);
    setCompletedState(completedTodosArray);
  };

  const completeTodo = index => {
    const todosArray = [...todos];
    const thisString = todosArray[index].toDoString;
    console.log('thisString: ' + thisString);
    todosArray[index].isCompleted = true;
    const completedArray = [...completed, todosArray[index]];
    setCompletedState(completedArray);
    todosArray.splice(index, 1);
    setTodosState(todosArray);
  };

  const toggleHidden = () => {
    if (isHidden === true) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }

  return (
    <div className="app">
      <div className="clickButton noselect" onClick={toggleHidden}>Todos</div>
      {isHidden ? null : <div className="todo-list">
        <h3 className="label noselect">ToDo List</h3>
        {todos.map((todo, index) => (
          <Todo className="todo" key={index} index={index} todo={todo} completeTodo={completeTodo} removeTodo={removeTodo} />
        ))}
        <Todos addTodo={addTodo} />
      </div>}
      {isHidden ? null : <div className="completed-list">
        <h3 className="label noselect">Completed</h3>
        {completed.map((todo, index) => (
          <CompletedTodo className="completedTodo" key={index} index={index} todo={todo} completeTodo={completeTodo} removeCompletedTodo={removeCompetedTodo} />
        ))}
      </div>}
    </div>
  );
}

export default App;