import { useEffect, useState } from "react";
import { createTask, getTasks, deleteTask } from "../services/taskService";
import { logout } from "../services/authService";
import "../App.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  // SORT + FILTER STATES
  const [sortBy, setSortBy] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [task, setTask] = useState({
    description: "",
    priority: "NORMAL",
    status: "NOT_STARTED",
    deadline: ""
  });

  // LOAD TASKS
  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    localStorage.setItem("loggedIn", "true");
    loadTasks();
    
  }, []);

  // ADD TASK
  const addTask = async (e) => {
    e.preventDefault();
    await createTask(task);
    setTask({
      description: "",
      priority: "NORMAL",
      status: "NOT_STARTED",
      deadline: ""
    });
    loadTasks();
  };

  // LOGOUT
  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("loggedIn");
    window.location.href = "/";
    // window.location.reload();
  };

  // ✅ FILTER + SORT LOGIC (FINAL)
  const filteredAndSortedTasks = tasks
    .filter((t) => {
      if (filterPriority && t.priority !== filterPriority) return false;
      if (filterStatus && t.status !== filterStatus) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "priority") {
        const order = { URGENT: 1, NORMAL: 2, LOW: 3 };
        return order[a.priority] - order[b.priority];
      }

      if (sortBy === "status") {
        return a.status.localeCompare(b.status);
      }

      if (sortBy === "deadline") {
        return new Date(a.deadline) - new Date(b.deadline);
      }

      return 0;
    });

  return (
    <div className="dashboard">
      <h1>To-Do List</h1>

      {/* LOGOUT */}
      <button
        style={{
          width: "150px",
          margin: "0 auto 20px",
          display: "block",
          background: "#f97316",
          color: "#fff"
        }}
        onClick={handleLogout}
      >
        Logout
      </button>

      {/* SORT */}
      <select
        style={{
          width: "200px",
          margin: "0 auto 15px",
          display: "block"
        }}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="priority">Priority</option>
        <option value="status">Status</option>
        <option value="deadline">Deadline</option>
      </select>

      {/* FILTERS */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "20px"
        }}
      >
        <select onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="">All Priority</option>
          <option>URGENT</option>
          <option>NORMAL</option>
          <option>LOW</option>
        </select>

        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option>NOT_STARTED</option>
          <option>IN_PROGRESS</option>
          <option>DONE</option>
          <option>MISSED</option>
        </select>
      </div>

      {/* ADD TASK FORM */}
      <form className="task-form" onSubmit={addTask}>
        <input
          placeholder="Task description"
          value={task.description}
          onChange={(e) =>
            setTask({ ...task, description: e.target.value })
          }
          required
        />

        <select
          value={task.priority}
          onChange={(e) =>
            setTask({ ...task, priority: e.target.value })
          }
        >
          <option>URGENT</option>
          <option>NORMAL</option>
          <option>LOW</option>
        </select>

        <select
          value={task.status}
          onChange={(e) =>
            setTask({ ...task, status: e.target.value })
          }
        >
          <option>STATUS</option>
          <option>IN_PROGRESS</option>
          <option>DONE</option>
          <option>MISSED</option>
        </select>

        <input
          type="date"
          value={task.deadline}
          onChange={(e) =>
            setTask({ ...task, deadline: e.target.value })
          }
        />

        <button>Add Task</button>
      </form>

      {/* TASK LIST */}
      {filteredAndSortedTasks.map((t) => (
        <div className="task" key={t.id}>
          <div className="task-details">
            <div className="task-title">{t.description}</div>
            <div className="task-meta">
              {t.priority} | {t.status} | {t.deadline}
            </div>
          </div>

          <button
            className="delete-btn"
            onClick={() => deleteTask(t.id).then(loadTasks)}
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
}
