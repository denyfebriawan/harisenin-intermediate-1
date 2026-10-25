import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
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

    if (form.password !== form.confirmPassword) {
      setError("Konfirmasi kata sandi tidak sama.");
      return;
    }

    try {
      register({ name: form.name, email: form.email, password: form.password });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="hero bg-base-200 min-h-[calc(100svh-4rem)] px-4 py-10">
      <div className="card bg-base-100 w-full max-w-sm shadow-xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <h1 className="card-title text-2xl">Daftar</h1>

          {error && (
            <div role="alert" className="alert alert-error alert-soft">
              {error}
            </div>
          )}

          <fieldset className="fieldset">
            <label className="label" htmlFor="name">
              Nama
            </label>
            <input id="name" name="name" type="text" className="input w-full" value={form.name} onChange={handleChange} autoComplete="name" required />

            <label className="label" htmlFor="email">
              Email
            </label>
            <input id="email" name="email" type="email" className="input w-full" value={form.email} onChange={handleChange} autoComplete="email" required />

            <label className="label" htmlFor="password">
              Kata sandi (min. 8 karakter)
            </label>
            <input id="password" name="password" type="password" className="input w-full" value={form.password} onChange={handleChange} autoComplete="new-password" minLength={8} required />

            <label className="label" htmlFor="confirmPassword">
              Konfirmasi kata sandi
            </label>
            <input id="confirmPassword" name="confirmPassword" type="password" className="input w-full" value={form.confirmPassword} onChange={handleChange} autoComplete="new-password" minLength={8} required />
          </fieldset>

          <button type="submit" className="btn btn-primary mt-2">
            Daftar
          </button>

          <p className="text-center text-sm">
            Sudah punya akun?{" "}
            <Link to="/login" className="link link-primary">
              Masuk
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
