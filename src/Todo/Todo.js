import React, { useState, useEffect } from "react";
import "./Todo.css";

function Task({ task, index, completeTask, removeTask }) {
  return (
    <div
      className="task"
      style={{ textDecoration: task.completed ? "line-through" : "" }}
    >
      {task.title}

      <button style={{ background: "red" }} onClick={() => removeTask(index)}>
        x
      </button>
      <button onClick={() => completeTask(index)}>Complete</button>
    </div>
  );
}

function CreateTask({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add a new task"
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function Todo() {
  const [theme, setTheme] = useState("light");
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [tasks, setTasks] = useState([
    {
      title: "Task 1",
      completed: true,
    },
    {
      title: "Task 2",
      completed: true,
    },
    {
      title: "Task 4",
      completed: true,
    },
    {
      title: "Task 3",
      completed: false,
    },
  ]);

  useEffect(() => {
    setTasksRemaining(tasks.filter((task) => !task.completed).length);
  }, [tasks]);

  const addTask = (title) => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const clearCompletedTasks = () => {
    const newTasks = tasks.filter((task) => !task.completed);
    setTasks(newTasks);
  };

  const filterTasks = (filterType) => {
    switch (filterType) {
      case "all":
        setTasksRemaining(tasks.length);
        break;
      case "active":
        setTasksRemaining(tasks.filter((task) => !task.completed).length);
        setTasks(tasks.filter((task) => !task.completed));
        break;
      case "completed":
        const completedTasks = tasks.map((task, index) => {
          if (!task.completed) {
            return { ...task, completed: true };
          }
          return task;
        });
        setTasks(completedTasks);
        setTasksRemaining(0); // Since all tasks are now marked as completed
        break;
      default:
        setTasksRemaining(tasks.length);
        break;
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`todo-container ${theme}`}>
      <div className="theme-toggle">
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>

      <div className="header">Pending tasks ({tasksRemaining})</div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <Task
            task={task}
            index={index}
            completeTask={completeTask}
            removeTask={removeTask}
            key={index}
          />
        ))}
      </div>
      <div className="create-task">
        <CreateTask addTask={addTask} />
      </div>
      <div className="filter">
        <button onClick={() => filterTasks("all")}>All</button>
        <button onClick={() => filterTasks("active")}>Active</button>
        <button onClick={() => filterTasks("completed")}>Completed</button>
        <button onClick={clearCompletedTasks}>Clear Completed</button>
      </div>
    </div>
  );
}

export default Todo;
