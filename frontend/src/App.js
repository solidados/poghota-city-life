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

// layouts
import RootLayout from "./layouts/RootLayout";
import AccountLayout from "./layouts/AccountLayout";


function App () {
  const { user } = useAuthContext()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="account" element={user ? <AccountLayout /> : <Navigate to="/login" />}>
          <Route path="profile" />
          <Route path="complaints" />
        </Route>
      </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  );
}

export default App;
