import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function RootLayout () {
  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
