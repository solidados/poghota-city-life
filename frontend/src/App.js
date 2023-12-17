import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider, useNavigate
} from "react-router-dom";

// hooks
import { useAuthContext } from "./hooks/useAuthContext";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs/AboutUs";
import Profile from "./pages/account/Profile";
import Complaints from "./pages/account/Complaints";

// layouts
import RootLayout from "./layouts/RootLayout";
import AccountLayout from "./layouts/AccountLayout";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";


function App () {
  const { user } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/*<Route index element={user ? <Home /> : <Navigate to="/login" />} />*/}
        <Route path="/" element={<Home />} />
        <Route path = "about" element = {<AboutUs/>}/>
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

  useEffect(() => {
    if (sessionStorage.getItem('lastRoute')) {
      router.navigate(sessionStorage.getItem('lastRoute'));
    }
    window.onbeforeunload = () => {
      sessionStorage.setItem('lastRoute', window.location.pathname);
    }
  }, []);
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
