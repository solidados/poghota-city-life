import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";

// hooks
import { useAuthContext } from "./hooks/useAuthContext";

// pages
import Home from "./pages/Home";
import TeamPage from "./pages/Contact/TeamPage";
import AboutUs from "./pages/AboutUs/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/account/Profile";
import Complaints from "./pages/account/Complaints";
import NotFound from "./pages/NotFound";

// layouts
import RootLayout from "./layouts/RootLayout";
import AccountLayout from "./layouts/AccountLayout";


function App () {
  const { user } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/*<Route index element={user ? <Home /> : <Navigate to="/login" />} />*/}
        <Route path="/" element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<TeamPage />} />
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
  }, [router]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
