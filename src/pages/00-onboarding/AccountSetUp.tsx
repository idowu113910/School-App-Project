import { useEffect, useRef, useState } from "react";
import HeaderCurve from "../../layout/HeaderCurve";
import { AiOutlineEye } from "react-icons/ai";
import eoff from "../../assets/eyes off.svg";
import { IoArrowForwardOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  getAuthErrorMessage,
  resendSignupEmail,
  signUp,
  verifySignupCode,
} from "../../services/authService";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const AccountSetUp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNextScreen, setShowNextScreen] = useState(false);
  const [isContinueLoading, setIsContinueLoading] = useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0);
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [didVerifyEmail, setDidVerifyEmail] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useAuth();
  const isEmailVerified = didVerifyEmail || Boolean(user?.email_confirmed_at);
  const callbackError = new URLSearchParams(
    location.search || location.hash.slice(1),
  ).get("error_description");

  const contactFields = [
    {
      label: "Email",
      placeholder: "you@example.com",
      type: "email",
      key: "email",
    },
    {
      label: "Phone Number",
      placeholder: "+234 555 555 5555",
      type: "tel",
      key: "phoneNumber",
    },
  ] as const;

  const [contactValues, setContactValues] = useState({
    email: "",
    phoneNumber: "",
  });

  const passwordsMatch =
    password === confirmPassword || confirmPassword.length === 0;
  const isAccountFilled =
    isValidEmail(contactValues.email) &&
    contactValues.phoneNumber.trim() !== "" &&
    password.length >= 8 &&
    confirmPassword.length >= 8 &&
    password === confirmPassword;
  const isOtpFilled = otpValues.every((value) => value !== "");

  useEffect(() => {
    if (!showNextScreen || timer <= 0) return;
    const interval = window.setInterval(
      () => setTimer((previous) => Math.max(0, previous - 1)),
      1000,
    );
    return () => window.clearInterval(interval);
  }, [showNextScreen, timer]);

  const handleContinue = async () => {
    if (!isAccountFilled || isContinueLoading) return;
    setIsContinueLoading(true);
    setMessage("");
    try {
      const { user: registeredUser } = await signUp(
        contactValues.email.trim(),
        password,
        contactValues.phoneNumber.trim(),
      );
      if (registeredUser?.email_confirmed_at) {
        setDidVerifyEmail(true);
        return;
      }
      setOtpValues(Array(6).fill(""));
      setShowNextScreen(true);
      setTimer(60);
      setMessage(
        "Check your inbox for a verification link or code. If an account already exists, sign in instead.",
      );
    } catch (error) {
      setMessage(getAuthErrorMessage(error));
    } finally {
      setIsContinueLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const digits = value.replace(/\D/g, "").slice(0, 6);
    const nextValues = [...otpValues];

    if (digits.length > 1) {
      for (let offset = 0; offset < digits.length && index + offset < 6; offset++) {
        nextValues[index + offset] = digits[offset];
      }
      setOtpValues(nextValues);
      inputRefs.current[Math.min(index + digits.length, 5)]?.focus();
      return;
    }

    nextValues[index] = digits;
    setOtpValues(nextValues);
    if (digits && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleVerifyCode = async () => {
    if (!isOtpFilled || isVerifyLoading) return;
    setIsVerifyLoading(true);
    setMessage("");
    try {
      await verifySignupCode(contactValues.email.trim(), otpValues.join(""));
      setShowNextScreen(false);
      setDidVerifyEmail(true);
    } catch (error) {
      setMessage(getAuthErrorMessage(error));
    } finally {
      setIsVerifyLoading(false);
    }
  };

  const handleResend = async () => {
    if (isResendLoading || timer > 0) return;
    setIsResendLoading(true);
    setMessage("");
    try {
      await resendSignupEmail(contactValues.email.trim());
      setTimer(60);
      setOtpValues(Array(6).fill(""));
      setMessage("A new verification email has been sent.");
    } catch (error) {
      setMessage(getAuthErrorMessage(error));
    } finally {
      setIsResendLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-white flex items-center justify-center">
        <div className="flex items-center gap-1.5" role="status">
          <div className="w-2 h-2 rounded-full bg-[#122354] dot-1" />
          <div className="w-2 h-2 rounded-full bg-[#122354] dot-2" />
          <div className="w-2 h-2 rounded-full bg-[#122354] dot-3" />
        </div>
      </div>
    );
  }

  if (isEmailVerified) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white px-6">
        <div className="w-full bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] flex flex-col items-center py-10 px-6">
          <motion.div
            className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <motion.svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.2 }}
            >
              <path
                d="M5 13l4 4L19 7"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
          <h1 className="font-bold text-[20px] text-black text-center">
            Email Verified! 🎉
          </h1>
          <p className="font-normal text-[12px] text-[#817E7E] text-center mt-2">
            Your email has been confirmed. Continue by signing in to your
            account.
          </p>
          <button
            onClick={() =>
              navigate(user ? "/home" : "/signin", { replace: true })
            }
            className="flex items-center justify-center w-full h-12.75 rounded-[10px] py-3.75 px-2.5 gap-1.25 bg-[#122354] text-white mt-6"
          >
            <span className="font-semibold text-[14px]">
              {user ? "Go to Dashboard" : "Go to Sign In"}
            </span>
            <IoArrowForwardOutline />
          </button>
        </div>
      </div>
    );
  }

  if (showNextScreen) {
    return (
      <>
        <HeaderCurve />
        <div className="flex flex-col gap-1.75 items-center text-center mt-10">
          <h1 className="font-semibold text-[20px] text-[#122354]">
            Check Your Email
          </h1>
          <p className="font-normal text-[12px] text-[#817E7E] px-8">
            We sent a verification link or code to:{" "}
            <span className="font-semibold text-[#122354]">
              {contactValues.email}.
            </span>{" "}
            Follow the link or enter the code below.
          </p>
        </div>

        <div className="flex gap-2 items-center text-center justify-center mt-8 px-4">
          {otpValues.map((value, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={6}
              value={value}
              onChange={(event) => handleOtpChange(index, event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === "Backspace" &&
                  !otpValues[index] &&
                  index > 0
                ) {
                  inputRefs.current[index - 1]?.focus();
                }
              }}
              aria-label={`Verification code digit ${index + 1}`}
              className={`w-11 h-14 rounded-[10px] text-center text-[18px] font-semibold text-[#122354] focus:outline-none focus:border-2 focus:border-[#122354] focus:bg-white caret-transparent
                ${value ? "bg-white border-2 border-[#122354]" : "bg-[#E3E1E1]"}`}
            />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          {timer === 0 ? (
            <button
              onClick={handleResend}
              disabled={isResendLoading}
              className="text-[12px] text-[#122354] font-semibold disabled:opacity-50"
            >
              {isResendLoading ? "Sending..." : "Resend verification email"}
            </button>
          ) : (
            <p className="font-normal text-[12px] text-[#817E7E]">
              Resend email in{" "}
              <span className="font-semibold text-[#122354]">
                00:{timer < 10 ? `0${timer}` : timer}
              </span>
            </p>
          )}
        </div>

        {message && (
          <p
            className={`text-center text-[12px] mt-3 px-6 ${message.startsWith("Check") || message.startsWith("A new") ? "text-green-600" : "text-red-500"}`}
            role={message.startsWith("A new") ? "status" : "alert"}
          >
            {message}
          </p>
        )}

        <button
          onClick={handleVerifyCode}
          disabled={!isOtpFilled || isVerifyLoading}
          className={`flex items-center justify-center py-3.75 px-2.5 gap-1.25 rounded-[10px] h-12.75 max-w-87.75 w-full mx-auto text-white mt-5 transition-opacity duration-300 disabled:cursor-not-allowed
            ${isOtpFilled && !isVerifyLoading ? "bg-[#122354] opacity-100" : "bg-[#122354] opacity-40"}`}
        >
          <span className="font-semibold text-[14px]">
            {isVerifyLoading ? "Verifying..." : "Verify Code"}
          </span>
          <IoArrowForwardOutline />
        </button>

        <div className="flex flex-col gap-1.75 items-center text-center mt-6">
          <p className="text-[#817E7E] font-normal text-[12px]">
            Wrong Email?{" "}
            <button
              onClick={() => {
                setShowNextScreen(false);
                setMessage("");
                setOtpValues(Array(6).fill(""));
              }}
              className="font-semibold text-[#122354]"
            >
              Change Email
            </button>
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderCurve />
      <div className="p-4 mt-10">
        <div className="flex flex-col">
          <h1 className="font-semibold text-[22px] text-[#1E3A8A] leading-[100%]">
            Set Up Your Account
          </h1>
          <p className="font-medium text-[12px] text-[#817E7E] mt-4 w-full">
            Enter your personal contact details to complete your account
          </p>
        </div>

        {contactFields.map((field, index) => (
          <label
            key={field.key}
            className={`flex flex-col gap-y-1.25 ${index === 0 ? "mt-8" : "mt-5"}`}
          >
            <span className="font-medium text-[14px] text-[#122354]">
              {field.label}
            </span>
            <input
              type={field.type}
              inputMode={field.type === "email" ? "email" : "tel"}
              autoComplete={field.type === "email" ? "email" : "tel"}
              placeholder={field.placeholder}
              value={contactValues[field.key]}
              onChange={(event) => {
                const value =
                  field.type === "tel"
                    ? event.target.value.replace(/[^0-9+\s()-]/g, "")
                    : event.target.value;
                setContactValues((previous) => ({
                  ...previous,
                  [field.key]: value,
                }));
                if (field.type === "email") {
                  setEmailError(false);
                  setMessage("");
                }
              }}
              onBlur={() => {
                if (
                  field.type === "email" &&
                  contactValues.email &&
                  !isValidEmail(contactValues.email)
                ) {
                  setEmailError(true);
                }
              }}
              className={`border rounded-[10px] py-3.75 px-2.5 h-12 bg-[#FCFDFF] placeholder:text-[12px] font-normal w-full focus:outline-none text-black focus:border-[#122354]
                ${field.type === "email" && emailError ? "border-red-400 focus:border-red-400" : "border-[#E9EBF8] focus:border-[#122354]"}`}
            />
            {field.type === "email" && emailError && (
              <span className="text-red-400 text-[11px] font-normal mt-1">
                Please enter a valid email address
              </span>
            )}
          </label>
        ))}

        <label className="flex flex-col mt-5 gap-y-1.25">
          <span className="font-medium text-[14px] text-[#122354]">
            Create Password
          </span>
          <span className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Min. 8 character"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordError(false);
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

        <label className="flex flex-col mt-5 gap-y-1.25">
          <span className="font-medium text-[14px] text-[#122354]">
            Confirm Password
          </span>
          <span className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setConfirmPasswordError(false);
              }}
              onBlur={() => {
                if (confirmPassword && confirmPassword.length < 8) {
                  setConfirmPasswordError(true);
                }
              }}
              className={`border rounded-[10px] py-3.75 px-2.5 h-12 bg-[#FCFDFF] placeholder:text-[12px] font-normal w-full focus:outline-none text-black pr-10
                ${!passwordsMatch || confirmPasswordError ? "border-red-400 focus:border-red-400" : "border-[#E9EBF8] focus:border-[#122354]"}`}
            />
            <button
              type="button"
              aria-label={
                showConfirmPassword ? "Hide confirm password" : "Show confirm password"
              }
              onClick={() => setShowConfirmPassword((previous) => !previous)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <AiOutlineEye className="text-[#757575] text-xl" />
              ) : (
                <img src={eoff} alt="" className="w-5 h-5" />
              )}
            </button>
          </span>
          {confirmPasswordError && (
            <span className="text-red-400 text-[11px] font-normal mt-1">
              Password must be at least 8 characters
            </span>
          )}
          {!passwordsMatch && !confirmPasswordError && (
            <span className="text-red-400 text-[11px] font-normal mt-1">
              Passwords do not match
            </span>
          )}
        </label>

        {(message || callbackError) && (
          <p
            className={`mt-3 text-[12px] ${message.startsWith("Check") ? "text-green-600" : "text-red-500"}`}
            role="alert"
          >
            {callbackError || message}
          </p>
        )}

        <button
          onClick={handleContinue}
          disabled={!isAccountFilled || isContinueLoading}
          className={`flex items-center justify-center w-full h-12.75 rounded-[10px] py-3.75 px-2.5 gap-1.25 text-white mt-5 transition-opacity duration-300 disabled:cursor-not-allowed
            ${isAccountFilled && !isContinueLoading ? "bg-[#122354] opacity-100" : "bg-[#122354] opacity-40"}`}
        >
          {isContinueLoading ? (
            <span className="flex items-center gap-1.5" role="status">
              <span className="w-2 h-2 rounded-full bg-white dot-1" />
              <span className="w-2 h-2 rounded-full bg-white dot-2" />
              <span className="w-2 h-2 rounded-full bg-white dot-3" />
            </span>
          ) : (
            <>
              <span className="font-semibold text-[14px]">Continue</span>
              <IoArrowForwardOutline />
            </>
          )}
        </button>

        <p className="font-medium text-[12px] text-center mt-2 mx-auto">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-blue-500 font-semibold"
          >
            Login
          </button>
        </p>

        <div className="flex items-center text-center max-w-87 w-full mt-2 mx-auto">
          <p className="font-medium text-[12px]">
            By continuing you agree to our{" "}
            <span className="text-[#757575]">
              Terms of Service and Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default AccountSetUp;
