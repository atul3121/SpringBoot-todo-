import { useState } from "react";
import { signup } from "../services/authService";
import "../App.css";

export default function Signup() {
  const [form, setForm] = useState({ username: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await signup(form);
    alert("Signup successful");
    window.location.href = "/";
  };

  return (
    <div className="center">
      <form className="card" onSubmit={submit}>
        <h2>Signup</h2>

        <input
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button>Signup</button>

        <div className="link" onClick={() => (window.location.href = "/")}>
          Back to login
        </div>
      </form>
    </div>
  );
}
