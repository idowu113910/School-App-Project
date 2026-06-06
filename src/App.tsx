import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/01-home/Home";
import Fees from "./pages/02-fees/Fees";
import History from "./pages/03-history/History";
import Profile from "./pages/04-profile/Profile";
import Footer from "./layout/Footer";
import type { JSX } from "react/jsx-runtime";
import Onboarding from "./pages/00-onboarding/Onboarding";
import VerifyStudent from "./pages/00-onboarding/VerifyStudent";
import AccountSetUp from "./pages/00-onboarding/AccountSetUp";
import SignIn from "./pages/00-onboarding/SignIn";
import GetStarted from "./pages/00-onboarding/GetStarted";
import Pin from "./pages/00-onboarding/Pin";

// Layout wrapper - Footer appears only on these pages
const RootLayout = (): JSX.Element => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  // Onboarding page WITHOUT footer
  {
    path: "/",
    element: <Onboarding />,
  },

  {
    path: "/getstarted",
    element: <GetStarted />,
  },

  {
    path: "/verifystudent",
    element: <VerifyStudent />,
  },

  {
    path: "/accountsetup",
    element: <AccountSetUp />,
  },

  {
    path: "/signin",
    element: <SignIn />,
  },

  {
    path: "/pin",
    element: <Pin />,
  },

  // Pages WITH footer
  {
    element: <RootLayout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/fees", element: <Fees /> },
      { path: "/history", element: <History /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
