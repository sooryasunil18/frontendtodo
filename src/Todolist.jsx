import React, { useState, useEffect } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./api";
import "./index.css";

const Todolist = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    if (task.trim()) {
      try {
        const res = await addTask(task);
        setTasks([...tasks, res.data]);
        setTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const handleToggleTask = async (id, completed) => {
    try {
      const res = await updateTask(id, { completed: !completed });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task._id);
    setEditText(task.text);
  };

  const handleUpdateTask = async (id) => {
    try {
      const res = await updateTask(id, { text: editText });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      setEditingTask(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container">
       <h1 className="heading">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/833/833593.png"
                    alt="Calendar"
                    style={{ width: "30px", marginRight: "10px" }}
                />
                To Do List
            </h1>
      <div className="input-group">
        <input
          type="text"
          className="task-input"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="add-btn" onClick={handleAddTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t._id} className={`task-item ${t.completed ? "completed" : ""}`}>
            <div className="task-row">
              {editingTask === t._id ? (
                <input
                  type="text"
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span onClick={() => handleToggleTask(t._id, t.completed)} className="task-text">
                  {t.text}
                </span>
              )}
              <div className="action-buttons">
                {editingTask === t._id ? (
                  <button className="save" onClick={() => handleUpdateTask(t._id)}>Save</button>
                ) : (
                  <button className="edit" onClick={() => startEditing(t)}>Edit</button>
                )}
                <button className="delete" onClick={() => handleDeleteTask(t._id)}>Delete</button>
              </div>
            </div>
            <span className="task-date">{new Date(t.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
