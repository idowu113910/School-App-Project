import { useState } from "react";
import HeaderCurve from "../../layout/HeaderCurve";
import { AiOutlineEye } from "react-icons/ai";
import eoff from "../../assets/eyes off.svg";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  getAuthErrorMessage,
  requestPasswordReset,
  resendSignupEmail,
  signIn,
} from "../../services/authService";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { error: sessionError } = useAuth();

  const isFormFilled =
    isValidEmail(email) && email.length > 0 && password.length >= 8;

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormFilled || isLoginLoading) return;

    setIsLoginLoading(true);
    setErrorMessage("");
    setStatusMessage("");
    try {
      await signIn(email.trim(), password);
      const requestedPath = (
        location.state as { from?: { pathname?: string } } | null
      )?.from?.pathname;
      navigate(requestedPath || "/home", { replace: true });
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!isValidEmail(email)) {
      setEmailError(true);
      setErrorMessage("Enter a valid email address to reset your password.");
      return;
    }

    setIsResetLoading(true);
    setErrorMessage("");
    setStatusMessage("");
    try {
      await requestPasswordReset(email.trim());
      setStatusMessage("If an account exists for this email, a reset link has been sent.");
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setIsResetLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!isValidEmail(email)) {
      setErrorMessage("Enter a valid email address before resending verification.");
      return;
    }

    setIsResendLoading(true);
    setErrorMessage("");
    setStatusMessage("");
    try {
      await resendSignupEmail(email.trim());
      setStatusMessage("A new verification email has been sent.");
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setIsResendLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        <HeaderCurve />
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute bottom-28 left-5 text-white"
        >
          <BiArrowBack />
        </button>
      </div>

      <form className="p-6 mt-4 gap-y-1.75" onSubmit={handleLogin}>
        <h1 className="font-semibold text-[#1E3A8A] text-[22px]">
          Welcome Back 👋
        </h1>
        <p className="font-normal text-[12px] text-[#817E7E] mt-2">
          Login to continue managing your school payments
        </p>

        <label className="flex flex-col mt-8 gap-y-1.25">
          <span className="font-medium text-[14px] text-[#122354]">Email</span>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError(false);
              setErrorMessage("");
            }}
            onBlur={() => {
              if (email && !isValidEmail(email)) setEmailError(true);
            }}
            className={`border rounded-[10px] py-3.75 px-2.5 h-12 bg-[#FCFDFF] placeholder:text-[12px] font-normal w-full focus:outline-none text-black
              ${emailError ? "border-red-400 focus:border-red-400" : "border-[#E9EBF8] focus:border-[#122354]"}`}
          />
          {emailError && (
            <span className="text-red-400 text-[11px] font-normal mt-1">
              Please enter a valid email address
            </span>
          )}
        </label>

        <label className="flex flex-col mt-5 gap-y-1.25">
          <span className="font-medium text-[14px] text-[#122354]">
            Password
          </span>
          <span className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Min. 8 character"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordError(false);
                setErrorMessage("");
              }}
              onBlur={() => {
                if (password && password.length < 8) setPasswordError(true);
              }}
              className={`border rounded-[10px] py-3.75 px-2.5 h-12 bg-[#FCFDFF] placeholder:text-[12px] font-normal w-full focus:outline-none text-black pr-10
                ${passwordError ? "border-red-400 focus:border-red-400" : "border-[#E9EBF8] focus:border-[#122354]"}`}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((previous) => !previous)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <AiOutlineEye className="text-[#757575] text-xl" />
              ) : (
                <img src={eoff} alt="" className="w-5 h-5" />
              )}
            </button>
          </span>
          {passwordError && (
            <span className="text-red-400 text-[11px] font-normal mt-1">
              Password must be at least 8 characters
            </span>
          )}
        </label>

        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={handlePasswordReset}
            disabled={isResetLoading}
            className="text-[#122354] font-semibold text-[12px] disabled:opacity-50"
          >
            {isResetLoading ? "Sending reset link..." : "Forgot Password"}
          </button>
        </div>

        {(errorMessage || statusMessage || sessionError) && (
          <div
            className={`mt-3 text-[12px] ${errorMessage || sessionError ? "text-red-500" : "text-green-600"}`}
            role={errorMessage || sessionError ? "alert" : "status"}
          >
            {errorMessage ||
              statusMessage ||
              (sessionError
                ? getAuthErrorMessage(new Error(sessionError))
                : "")}
          </div>
        )}

        {errorMessage.toLowerCase().includes("verify the verification") ||
        errorMessage.toLowerCase().includes("not verified yet") ? (
          <button
            type="button"
            onClick={handleResendVerification}
            disabled={isResendLoading}
            className="mt-2 text-[#122354] font-semibold text-[12px] underline disabled:opacity-50"
          >
            {isResendLoading ? "Sending..." : "Resend verification email"}
          </button>
        ) : null}

        <button
          type="submit"
          disabled={!isFormFilled || isLoginLoading}
          className={`flex items-center justify-center w-full h-12.75 rounded-[10px] py-3.75 px-2.5 mt-6 transition-opacity duration-300 text-white font-semibold text-[14px]
            ${isFormFilled && !isLoginLoading ? "bg-[#122354] opacity-100" : "bg-[#122354] opacity-40"}
            disabled:cursor-not-allowed`}
        >
          {isLoginLoading ? (
            <span className="flex items-center gap-1.5" role="status">
              <span className="w-2 h-2 rounded-full bg-white dot-1" />
              <span className="w-2 h-2 rounded-full bg-white dot-2" />
              <span className="w-2 h-2 rounded-full bg-white dot-3" />
            </span>
          ) : (
            "Login"
          )}
        </button>

        <div className="flex items-center gap-3 w-full mt-2.5">
          <div className="flex-1 h-px bg-[#817E7E]" />
          <p className="font-normal text-[12px] text-[#817E7E]">or login with</p>
          <div className="flex-1 h-px bg-[#817E7E]" />
        </div>

        <button
          type="button"
          className="w-full h-12.75 rounded-[10px] border bg-[#FCFDFF] font-semibold text-[16px] mt-4"
        >
          👆 Use Biometric / Fingerprint
        </button>

        <p className="font-normal text-[12px] text-[#817E7E] flex items-center text-center justify-center mt-1.5 mx-auto">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/accountsetup")}
            className="font-medium text-[12px] text-[#122354]"
          >
            Sign Up
          </button>
        </p>
      </form>
    </>
  );
};

export default SignIn;
