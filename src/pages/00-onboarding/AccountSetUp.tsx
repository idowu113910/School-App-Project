import { useEffect, useRef, useState } from "react";
import HeaderCurve from "../../layout/HeaderCurve";
import { AiOutlineEye } from "react-icons/ai";
import eoff from "../../assets/eyes off.svg";
import { IoArrowForwardOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import schoolIcon from "../../assets/Frame 2121457494.svg";
import { useNavigate } from "react-router-dom";

const AccountSetUp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const passwordsMatch = password === confirmPassword || confirmPassword === "";
  const [showNextScreen, setShowNextScreen] = useState(false);
  const [isContinueLoading, setIsContinueLoading] = useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [timer, setTimer] = useState(59);
  const [otp, setOtp] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyPhase, setVerifyPhase] = useState<
    "idle" | "loading" | "spinning" | "success"
  >("idle");
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const contactFields = [
    {
      label: "Email",
      placeholder: "Odafesamuel@gmail.com",
      type: "email",
      inputMode: "email" as const,
      key: "email",
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
    },
    {
      label: "Phone Number",
      placeholder: "+234 555 555 5555",
      type: "tel",
      inputMode: "numeric" as const,
      key: "phoneNumber",
      pattern: "[0-9+\\s]+",
    },
  ];

  const validateEmail = (value: string) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return pattern.test(value);
  };

  const [contactValues, setContactValues] = useState({
    email: "",
    phoneNumber: "",
  });

  const isAccountFilled =
    contactValues.email !== "" &&
    validateEmail(contactValues.email) &&
    contactValues.phoneNumber !== "" &&
    password.length >= 8 &&
    confirmPassword.length >= 8 &&
    password === confirmPassword;

  const handleContinue = () => {
    setIsContinueLoading(true);
    setTimeout(() => {
      setIsContinueLoading(false);
      setShowNextScreen(true);
    }, 3000);
  };

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value.slice(-1);
    setOtpValues(newOtp);
    setOtp(newOtp.join(""));

    const wrapper = (inputRefs.current as any)[`wrap_${index}`];
    if (wrapper && value) {
      wrapper.classList.remove("pop");
      void wrapper.offsetWidth;
      wrapper.classList.add("pop");
    }

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isOtpFilled = otp.length === 5;

  const handleVerifyCode = () => {
    setIsVerifyLoading(true);
    setTimeout(() => {
      setIsVerifyLoading(false);
      setVerifyPhase("spinning");
      setTimeout(() => {
        setVerifyPhase("success");
      }, 3000);
    }, 2000);
  };

  if (verifyPhase === "spinning" || verifyPhase === "success") {
    return (
      <div className="min-h-dvh w-full flex items-center justify-center bg-white px-6">
        <div className="w-full bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] flex flex-col items-center py-10 px-6">
          <div className="relative flex items-center justify-center w-24 h-24 mb-6">
            {verifyPhase === "spinning" && (
              <>
                <svg
                  className="spin-ring absolute"
                  width="96"
                  height="96"
                  viewBox="0 0 96 96"
                >
                  <circle
                    cx="48"
                    cy="48"
                    r="44"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="4"
                    strokeDasharray="50 230"
                    strokeLinecap="round"
                  />
                </svg>
                <img src={schoolIcon} alt="" className="w-14 h-14" />
              </>
            )}

            {verifyPhase === "success" && (
              <motion.div
                className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center"
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
            )}
          </div>

          <div className="flex flex-col gap-y-2.5">
            <div className="flex flex-col">
              <h2 className="font-bold text-[20px] text-black text-center">
                Email Verified! 🎉
              </h2>
              <p className="font-normal text-[12px] text-[#817E7E] text-center mt-2">
                Your number has been successfully confirmed
              </p>
            </div>

            <div className="flex flex-col">
              <p className="font-medium text-[12px] text-[#122354] text-center mt-1.5">
                You can now secure your account with a payment pin
              </p>
              <div
                onClick={() => navigate("/pin")}
                className="flex items-center justify-center max-w-87.75 w-full h-12.75 rounded-[10px] py-3.75 px-2.5 gap-1.25 bg-[#122354] text-white mt-3 cursor-pointer"
              >
                <button className="font-semibold text-[14px]">
                  Set Payment PIN
                </button>
                <IoArrowForwardOutline />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showNextScreen) {
    return (
      <>
        <div>
          <HeaderCurve />
          <div className="min-h-dvh flex flex-col gap-1.75 items-center text-center mt-10">
            <p className="font-semibold text-[20px] text-[#122354]">
              Check Your Email
            </p>
            <p className="font-normal text-[12px] text-[#817E7E] px-8">
              We sent a 5-digit code to:{" "}
              <span className="font-semibold text-[12px] text-[#122354]">
                {contactValues.email}.
              </span>{" "}
              Enter it below to verify your number
            </p>
          </div>

          <div className="flex gap-4 items-center text-center justify-center mt-8">
            {otpValues.map((val, index) => {
              const isNextEmpty =
                !val &&
                otpValues[index - 1] !== undefined &&
                otpValues[index - 1] !== "" &&
                otpValues.slice(0, index).every((v) => v !== "");
              const isFirst =
                index === 0 && !val && otpValues.every((v) => v === "");

              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) (inputRefs.current as any)[`wrap_${index}`] = el;
                  }}
                  className="w-13.5 h-14.25"
                >
                  <input
                    ref={(el) => {
                      if (el) inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={val}
                    placeholder={isNextEmpty || isFirst ? "_" : ""}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={`w-full h-full rounded-[10px] text-center text-[18px] font-semibold text-[#122354] focus:outline-none focus:border-2 focus:border-[#122354] focus:bg-white caret-transparent
                      ${val ? "bg-white border-2 border-[#122354]" : "bg-[#E3E1E1]"}
                      placeholder:text-[#122354] placeholder:font-semibold`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          {timer === 0 ? (
            <p
              onClick={() => setTimer(59)}
              className="text-[12px] text-[#122354] cursor-pointer font-semibold"
            >
              Resend code
            </p>
          ) : (
            <p className="font-normal text-[12px] text-[#817E7E]">
              Resend code in{" "}
              <span className="text-[12px] font-semibold text-[#122354]">
                00:{timer < 10 ? `0${timer}` : timer}
              </span>
            </p>
          )}
        </div>

        <div
          onClick={
            !isVerifyLoading && isOtpFilled ? handleVerifyCode : undefined
          }
          className={`flex items-center text-center justify-center py-3.75 px-2.5 gap-1.25 rounded-[10px] h-12.75 max-w-87.75 w-full mx-auto text-white mt-5 transition-opacity duration-300
            ${isOtpFilled && !isVerifyLoading ? "bg-[#122354] opacity-100 cursor-pointer" : "bg-[#122354] opacity-40 cursor-not-allowed"}`}
        >
          {isVerifyLoading ? (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white dot-1" />
              <div className="w-2 h-2 rounded-full bg-white dot-2" />
              <div className="w-2 h-2 rounded-full bg-white dot-3" />
            </div>
          ) : (
            <>
              <button
                disabled={!isOtpFilled}
                className="font-semibold text-[14px]"
              >
                Verify Code
              </button>
              <IoArrowForwardOutline />
            </>
          )}
        </div>

        <div className="flex flex-col gap-1.75 items-center text-center mt-6">
          <p className="text-[#817E7E] font-normal text-[12px]">
            Didn't get the code?{" "}
            <span
              onClick={() => setTimer(59)}
              className="font-semibold text-[12px] text-[#122354] cursor-pointer"
            >
              Resend
            </span>
          </p>
          <p className="text-[#817E7E] font-normal text-[12px]">
            Wrong Email?{" "}
            <span
              onClick={() => setShowNextScreen(false)}
              className="font-semibold text-[12px] text-[#122354] cursor-pointer"
            >
              Change Email
            </span>
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <HeaderCurve />
        <div className="min-h-dvh p-4 mt-10">
          <div className="flex flex-col">
            <h2 className="font-semibold text-[22px] text-[#1E3A8A] leading-[100%]">
              Set Up Your Account
            </h2>
            <p className="font-medium text-[12px] text-[#817E7E] mt-4 w-full">
              Enter your personal contact details to complete your account
            </p>
          </div>

          <div>
            {contactFields.map((field, index) => (
              <div
                key={field.label}
                className={`flex flex-col gap-y-1.25 ${index === 0 ? "mt-8" : "mt-5"}`}
              >
                <h4 className="font-medium text-[14px] text-[#122354]">
                  {field.label}
                </h4>
                <input
                  type={field.type}
                  inputMode={field.inputMode}
                  placeholder={field.placeholder}
                  value={contactValues[field.key as keyof typeof contactValues]}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (field.type === "tel") {
                      value = value.replace(/[^0-9+\s]/g, "");
                    } else if (field.type === "email") {
                      value = value.replace(/[^a-zA-Z0-9@._+-]/g, "");
                      setEmailError(false);
                    }
                    setContactValues((prev) => ({
                      ...prev,
                      [field.key]: value,
                    }));
                  }}
                  onBlur={() => {
                    if (
                      field.type === "email" &&
                      contactValues.email &&
                      !validateEmail(contactValues.email)
                    ) {
                      setEmailError(true);
                    }
                  }}
                  className={`border rounded-[10px] py-3.75 px-2.5 h-12 bg-[#FCFDFF] placeholder:text-[12px] font-normal w-full focus:outline-none text-black focus:border-[#122354]
    ${field.type === "email" && emailError ? "border-red-400 focus:border-red-400" : "border-[#E9EBF8] focus:border-[#122354]"}`}
                />

                {field.type === "email" && emailError && (
                  <p className="text-red-400 text-[11px] font-normal mt-1">
                    Please enter a valid Gmail address e.g example@gmail.com
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col mt-5 gap-y-1.25">
            <h4 className="font-medium text-[14px] text-[#122354]">
              Create Password
            </h4>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 character"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                }}
                onBlur={() => {
                  if (password && password.length < 8) {
                    setPasswordError(true);
                  }
                }}
                className={`border rounded-[10px] py-3.75 px-2.5 h-12 bg-[#FCFDFF] placeholder:text-[12px] font-normal w-full focus:outline-none text-black pr-10
                  ${passwordError ? "border-red-400 focus:border-red-400" : "border-[#E9EBF8] focus:border-[#122354]"}`}
              />
              <div
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEye className="text-[#757575] text-xl" />
                ) : (
                  <img src={eoff} alt="hide password" className="w-5 h-5" />
                )}
              </div>
            </div>
            {passwordError && (
              <p className="text-red-400 text-[11px] font-normal mt-1">
                Password must be at least 8 characters
              </p>
            )}
          </div>

          <div className="flex flex-col mt-5 gap-y-1.25">
            <h4 className="font-medium text-[14px] text-[#122354]">
              Confirm Password
            </h4>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
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
              <div
                onClick={toggleConfirmPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEye className="text-[#757575] text-xl" />
                ) : (
                  <img src={eoff} alt="hide password" className="w-5 h-5" />
                )}
              </div>
            </div>
            {confirmPasswordError && (
              <p className="text-red-400 text-[11px] font-normal mt-1">
                Password must be at least 8 characters
              </p>
            )}
            {!passwordsMatch && !confirmPasswordError && (
              <p className="text-red-400 text-[11px] font-normal mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          <div
            onClick={
              !isContinueLoading && isAccountFilled ? handleContinue : undefined
            }
            className={`flex items-center justify-center w-full h-12.75 rounded-[10px] py-3.75 px-2.5 gap-1.25 text-white mt-5 transition-opacity duration-300
              ${isAccountFilled && !isContinueLoading ? "bg-[#122354] opacity-100 cursor-pointer" : "bg-[#122354] opacity-40 cursor-not-allowed"}`}
          >
            {isContinueLoading ? (
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white dot-1" />
                <div className="w-2 h-2 rounded-full bg-white dot-2" />
                <div className="w-2 h-2 rounded-full bg-white dot-3" />
              </div>
            ) : (
              <>
                <button
                  disabled={!isAccountFilled}
                  className="font-semibold text-[14px]"
                >
                  Continue
                </button>
                <IoArrowForwardOutline />
              </>
            )}
          </div>

          <div className="flex items-center text-center max-w-87 w-full mt-2 mx-auto">
            <p className="font-medium text-[12px]">
              By continuing you agree to our{" "}
              <span className="text-[#757575]">
                Terms of Service and Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSetUp;
