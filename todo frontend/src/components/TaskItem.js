import { deleteTask } from "../services/taskService";

export default function TaskItem({ task, refresh }) {
  return (
    <div>
      <p>{task.description}</p>
      <p>{task.priority} | {task.status} | {task.deadline}</p>
      <button onClick={() => deleteTask(task.id).then(refresh)}>Delete</button>
    </div>
  );
}
