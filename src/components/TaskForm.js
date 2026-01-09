import { useState } from "react";
import { createTask } from "../services/taskService";

export default function TaskForm({ refresh }) {
  const [task, setTask] = useState({
    description: "",
    priority: "NORMAL",
    status: "NOT_STARTED",
    deadline: ""
  });

  const handleChange = e =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    await createTask(task);
    refresh();
  };

  return (
    <form onSubmit={submit}>
      <input name="description" placeholder="Task description" onChange={handleChange} />

      <select name="priority" onChange={handleChange}>
        <option>URGENT</option>
        <option>NORMAL</option>
        <option>LOW</option>
      </select>

      <select name="status" onChange={handleChange}>
        <option>NOT_STARTED</option>
        <option>IN_PROGRESS</option>
        <option>DONE</option>
        <option>MISSED</option>
      </select>

      <input type="date" name="deadline" onChange={handleChange} />

      <button>Add Task</button>
    </form>
  );
}
