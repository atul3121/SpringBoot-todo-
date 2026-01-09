import { useState } from "react";
import { login } from "../services/authService";
import "../App.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  // 8080/isloggedin

  // 🔐 NORMAL LOGIN (SESSION BASED)
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ NO TOKEN STORAGE (SESSION AUTH)
      await login(form);

      // backend sets JSESSIONID cookie automatically
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  // 🔐 GOOGLE LOGIN (SESSION BASED)
  const googleLogin = () => {
    window.location.href =
      "http://localhost:8081/oauth2/authorization/google";
  };

  return (
    <div className="center">
      <form className="card" onSubmit={submit}>
        <h2>Login</h2>

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* GOOGLE LOGIN */}
        <button
          type="button"
          style={{
            marginTop: "10px",
            background: "#db4437",
            color: "#fff"
          }}
          onClick={googleLogin}
        >
          Login with Google
        </button>

        <div
          className="link"
          onClick={() => (window.location.href = "/signup")}
        >
          Create new account
        </div>
      </form>
    </div>
  );
}
