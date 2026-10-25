import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const submenuRef = useRef(null);

  useEffect(() => {
    function closeSubmenu(event) {
      if (!submenuRef.current.contains(event.target)) {
        submenuRef.current.open = false;
      }
    }

    document.addEventListener("click", closeSubmenu);
    return () => document.removeEventListener("click", closeSubmenu);
  }, []);

  return (
    <header className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" aria-label="Open menu" className="btn btn-ghost lg:hidden">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a href="#">Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a href="#">Submenu 1</a>
                </li>
                <li>
                  <a href="#">Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Item 3</a>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>
      <nav className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="#">Item 1</a>
          </li>
          <li>
            <details ref={submenuRef}>
              <summary>Parent</summary>
              <ul className="p-2 bg-base-100 w-40 z-1">
                <li>
                  <a href="#">Submenu 1</a>
                </li>
                <li>
                  <a href="#">Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a href="#">Item 3</a>
          </li>
        </ul>
      </nav>
      <div className="navbar-end gap-2">
        {user ? (
          <>
            <span className="hidden text-sm sm:inline">Hi, {user.name}</span>
            <button type="button" className="btn btn-ghost btn-sm sm:btn-md" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm sm:btn-md">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm sm:btn-md">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
