import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderCurve from "../../layout/HeaderCurve";
import { useAuth } from "../../hooks/useAuth";
import {
  getAuthErrorMessage,
  updatePassword,
} from "../../services/authService";

export default function PasswordReset() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdatePassword = async () => {
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setIsSaving(true);
    setMessage("");
    try {
      await updatePassword(password);
      setMessage("Your password has been updated.");
      navigate("/home", { replace: true });
    } catch (error) {
      setMessage(getAuthErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <HeaderCurve />
      <div className="p-6 mt-4">
        <h1 className="font-semibold text-[#1E3A8A] text-[22px]">
          Reset Password
        </h1>
        <p className="font-normal text-[12px] text-[#817E7E] mt-2">
          Choose a new password for your account.
        </p>

        {isLoading ? (
          <p className="mt-8 text-[12px] text-[#817E7E]" role="status">
            Checking your reset link...
          </p>
        ) : !user ? (
          <div className="mt-8">
            <p className="text-[12px] text-red-500" role="alert">
              This password reset link is invalid or has expired. Request a new
              one from the sign-in screen.
            </p>
            <button
              onClick={() => navigate("/signin")}
              className="mt-5 w-full h-12.75 rounded-[10px] bg-[#122354] text-white font-semibold text-[14px]"
            >
              Return to Sign In
            </button>
          </div>
        ) : (
          <>
            <label className="flex flex-col mt-8 gap-y-1.25 text-[14px] font-medium text-[#122354]">
              New Password
              <input
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Min. 8 characters"
                className="border rounded-[10px] py-3.75 px-2.5 h-12 bg-[#FCFDFF] placeholder:text-[12px] font-normal w-full focus:outline-none text-black border-[#E9EBF8] focus:border-[#122354]"
              />
            </label>
            <label className="flex flex-col mt-5 gap-y-1.25 text-[14px] font-medium text-[#122354]">
              Confirm Password
              <input
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm password"
                className="border rounded-[10px] py-3.75 px-2.5 h-12 bg-[#FCFDFF] placeholder:text-[12px] font-normal w-full focus:outline-none text-black border-[#E9EBF8] focus:border-[#122354]"
              />
            </label>
            {message && (
              <p
                className={`mt-3 text-[12px] ${message.includes("updated") ? "text-green-600" : "text-red-500"}`}
                role="status"
              >
                {message}
              </p>
            )}
            <button
              onClick={handleUpdatePassword}
              disabled={isSaving}
              className="mt-6 w-full h-12.75 rounded-[10px] bg-[#122354] text-white font-semibold text-[14px] disabled:opacity-50"
            >
              {isSaving ? "Updating..." : "Update Password"}
            </button>
          </>
        )}
      </div>
    </>
  );
}
