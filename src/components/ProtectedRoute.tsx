import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        className="flex min-h-dvh items-center justify-center bg-white"
        role="status"
        aria-label="Restoring your session"
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#122354] dot-1" />
          <div className="w-2 h-2 rounded-full bg-[#122354] dot-2" />
          <div className="w-2 h-2 rounded-full bg-[#122354] dot-3" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
}
