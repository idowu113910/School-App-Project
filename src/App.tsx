import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/01-home/Home"));
const Fees = lazy(() => import("./pages/02-fees/Fees"));
const History = lazy(() => import("./pages/03-history/History"));
const Profile = lazy(() => import("./pages/04-profile/Profile"));
const Footer = lazy(() => import("./layout/Footer"));
const Onboarding = lazy(() => import("./pages/00-onboarding/Onboarding"));
const VerifyStudent = lazy(
  () => import("./pages/00-onboarding/VerifyStudent"),
);
const AccountSetUp = lazy(
  () => import("./pages/00-onboarding/AccountSetUp"),
);
const SignIn = lazy(() => import("./pages/00-onboarding/SignIn"));
const GetStarted = lazy(() => import("./pages/00-onboarding/GetStarted"));
const Pin = lazy(() => import("./pages/00-onboarding/Pin"));
const PasswordReset = lazy(
  () => import("./pages/00-onboarding/PasswordReset"),
);

// Layout wrapper - Footer appears only on these pages
const RootLayout = (): JSX.Element => {
  return (
    <>
      <div className="min-h-dvh flex flex-col">
        <div className="flex-1">
          <Outlet />
          <Footer />
        </div>
      </div>
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
    element: (
      <ProtectedRoute>
        <Pin />
      </ProtectedRoute>
    ),
  },

  {
    path: "/reset-password",
    element: <PasswordReset />,
  },

  // Pages WITH footer
  {
    element: <RootLayout />,
    children: [
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/fees",
        element: (
          <ProtectedRoute>
            <Fees />
          </ProtectedRoute>
        ),
      },
      {
        path: "/history",
        element: (
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh flex items-center justify-center bg-white">
          <div className="flex items-center gap-1.5" role="status">
            <div className="w-2 h-2 rounded-full bg-[#122354] dot-1" />
            <div className="w-2 h-2 rounded-full bg-[#122354] dot-2" />
            <div className="w-2 h-2 rounded-full bg-[#122354] dot-3" />
          </div>
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
