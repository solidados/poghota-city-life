import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

import logo from "../assets/logo.png";

const Navbar = () => {
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img className="navbar-logo" src={logo} alt="logo" />
        </Link>
        <nav>
          <div>
            <button onClick={handleClick}>Logout</button>
          </div>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
