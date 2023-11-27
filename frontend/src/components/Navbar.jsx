import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img className="navbar-logo" src={logo} alt="logo" />
        </Link>
        <nav>
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
