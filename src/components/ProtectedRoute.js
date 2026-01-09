import { useEffect, useState } from "react";
import { checkAuth } from "../services/authService";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    checkAuth()
      .then(() => setOk(true))
      .catch(() => setOk(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  if (!ok) {
    window.location.href = "/";
    return null;
  }

  return children;
}
