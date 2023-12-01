import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider
} from "react-router-dom";

// hooks
import { useAuthContext } from "./hooks/useAuthContext";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/account/Profile";
import Complaints from "./pages/account/Complaints";

// layouts
import RootLayout from "./layouts/RootLayout";
import AccountLayout from "./layouts/AccountLayout";
import NotFound from "./pages/NotFound";


function App () {
  const { user } = useAuthContext()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/*<Route index element={user ? <Home /> : <Navigate to="/login" />} />*/}
        <Route index element={<Home />} />
        <Route path="login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="account" element={user ? <AccountLayout /> : <Navigate to="/login" />}>
          <Route path="profile" element={<Profile />} />
          <Route path="complaints" element={<Complaints />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  );
}

export default App;
