import TaskItem from "./TaskItem";

export default function TaskList({ tasks, refresh }) {
  return tasks.map(task => (
    <TaskItem key={task.id} task={task} refresh={refresh} />
  ));
}
