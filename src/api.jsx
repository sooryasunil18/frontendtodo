import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Change this to your backend URL if deployed
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all tasks
export const getTasks = () => API.get("/tasks");

// Add a new task
export const addTask = (task) => API.post("/tasks", { text: task });

// Update a task
export const updateTask = (id, updatedData) => API.put(`/tasks/${id}`, updatedData);

// Delete a task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export default API;