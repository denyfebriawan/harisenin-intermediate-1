import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      login(form);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="hero bg-base-200 min-h-[calc(100svh-4rem)] px-4 py-10">
      <div className="card bg-base-100 w-full max-w-sm shadow-xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <h1 className="card-title text-2xl">Login</h1>

          {error && (
            <div role="alert" className="alert alert-error alert-soft">
              {error}
            </div>
          )}

          <fieldset className="fieldset">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input id="email" name="email" type="email" className="input w-full" value={form.email} onChange={handleChange} autoComplete="email" required />

            <label className="label" htmlFor="password">
              Password
            </label>
            <input id="password" name="password" type="password" className="input w-full" value={form.password} onChange={handleChange} autoComplete="current-password" required />
          </fieldset>

          <button type="submit" className="btn btn-primary mt-2">
            Login
          </button>

          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
