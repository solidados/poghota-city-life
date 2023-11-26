import {Link} from "react-router-dom";

import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img className="navbar-logo" src={logo} alt="logo" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
