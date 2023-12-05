import { NavLink, Outlet } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

function AccountLayout () {
  const { user } = useAuthContext()

  return (
    <div className="user-account">
      <div className="user-nav">
        <h2>{`${user.name}'s`} &gt;</h2>
        <nav>
          <NavLink to="profile">Profile</NavLink>
          <NavLink to="complaints">Complaints</NavLink>
        </nav>
      </div>

      <div className="user-data">
        <Outlet />
      </div>
    </div>
  );
}

export default AccountLayout;
