import { useEffect, useState } from "react";
import { checkAuth } from "../services/authService";

export default function PublicRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkAuth()
      .then(() => setLoggedIn(true))
      .catch(() => setLoggedIn(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  if (loggedIn) {
    window.location.href = "/dashboard";
    return null;
  }

  return children;
}
