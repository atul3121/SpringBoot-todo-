import api from "../api/axiosConfig";

export const createTask = (task) => {
  return api.post("/tasks", task);
};

export const getTasks = () => {
  return api.get("/tasks");
};

export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};
