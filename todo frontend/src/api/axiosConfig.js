import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
  withCredentials: true, // 🔴 REQUIRED FOR SESSION
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
