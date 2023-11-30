import { NavLink, Outlet } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

function AccountLayout () {
  const { user } = useAuthContext()

  return (
    <div className="user-account">
      <h2>{`${user.name}'s account`}</h2>
      <nav>
        <NavLink to="profile">Profile</NavLink>
        <NavLink to="complaints">Complaints</NavLink>
      </nav>

      <Outlet />
    </div>
  );
}

export default AccountLayout;
