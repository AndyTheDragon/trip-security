import { useState } from "react";
import { NavLink, redirect } from "react-router-dom";
import apiFacade from "../apiFacade";

const Header = ({ login, logout}) => {
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);


    const performLogin = (event) =>
    {
        event.preventDefault();
        login(loginCredentials.username, loginCredentials.password);
    }
    const performLogout = () =>
    {
        logout();
        setLoginCredentials(init);
        redirect("/");
    }
    const onChange = (event) =>
    {
        setLoginCredentials({ ...loginCredentials, [event.target.name]: event.target.value });
    }
  return (
    <header className="bg-body-secondary rounded text-center pt-3 mb-2">
      <h1>Welcome to the Trip Planner</h1>
      <p>Your adventure starts here!</p>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="nav nav-underline justify-content-center ms-3 me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/trips">
              Trips
            </NavLink>
          </li>
          {apiFacade.loggedIn() && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/guides">
                Guides
              </NavLink>
            </li>
          )}
        </ul>
        {!apiFacade.loggedIn() ? (
        <form className="me-1 d-flex justify-content-center" onSubmit={performLogin}>
            <input
                className="form-control me-2"
                name="username"
                type="text"
                onChange={onChange}
                value={loginCredentials.username}
                placeholder="Username"
                aria-label="Username"
            />
            <input
                className="form-control me-2"
                name="password"
                type="password"
                onChange={onChange}
                value={loginCredentials.password}
                placeholder="Password"
                aria-label="Password"
            />
            <button className="btn btn-outline-success" type="submit">
                Login
            </button>
        </form>
        ) : (
            <div className="d-flex justify-content-center me-1">
                <span>Hello {apiFacade.getUserName()}</span>
        <button className="btn btn-outline-danger mx-2" onClick={performLogout}>
            Logout
        </button>
        </div>
        )}
      </nav>
    </header>
  );
};
export default Header;
