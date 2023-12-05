import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import logo from "../assets/logo.png";

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <NavLink to="/">
          <img className="navbar-logo" src={logo} alt="logo" />
        </NavLink>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {user && (
            <div>
              {/* TODO: set to user.name || user.email? */}
              <NavLink to="/account/profile">
                <span className="user-logged">{`Welcome ${user.name}`}</span>
              </NavLink>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <NavLink to="/login">Login</NavLink>
              {/*<NavLink to="/register">Register</NavLink>*/}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
