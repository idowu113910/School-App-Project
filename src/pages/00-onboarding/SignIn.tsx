import { useState } from "react";
import HeaderCurve from "../../layout/HeaderCurve";
import { AiOutlineEye } from "react-icons/ai";
import eoff from "../../assets/eyes off.svg";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const [password, setPassword] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [matricError, setMatricError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const navigate = useNavigate();

  const validateMatric = (value: string) => {
    const pattern = /^\d{2}\/\d{3}\/\d{4}$/;
    return pattern.test(value);
  };

  const isFormFilled =
    matricNumber !== "" && validateMatric(matricNumber) && password.length >= 8;

  const handleLogin = () => {
    setIsLoginLoading(true);
    setTimeout(() => {
      setIsLoginLoading(false);
      navigate("/home");
    }, 3000);
  };

  return (
    <>
      <div className="relative">
        <HeaderCurve />
        <BiArrowBack className="absolute bottom-28 left-5 text-white" />
      </div>

      <div className="p-6 mt-4 gap-y-1.75">
        <h4 className="font-semibold text-[#1E3A8A] text-[22px]">
          Welcome Back 👋
        </h4>
        <p className="font-normal text-[12px] text-[#817E7E] mt-2">
          Login to continue managing your school payments
        </p>

        {/* MATRIC NUMBER */}
        <div className="flex flex-col mt-8 gap-y-1.25">
          <h4 className="font-medium text-[14px] text-[#122354]">
            Matric Number
          </h4>
          <input
            type="text"
            placeholder="e.g 19/112/0043"
            value={matricNumber}
            onChange={(e) => {
              setMatricNumber(e.target.value);
              setMatricError(false);
            }}
            onBlur={() => {
              if (matricNumber && !validateMatric(matricNumber)) {
                setMatricError(true);
              }
            }}
            className={`border rounded-[10px] py-3.75 px-2.5 h-12 bg-[#FCFDFF] placeholder:text-[12px] font-normal w-full focus:outline-none text-black
              ${matricError ? "border-red-400 focus:border-red-400" : "border-[#E9EBF8] focus:border-[#122354]"}`}
          />
          {matricError && (
            <p className="text-red-400 text-[11px] font-normal mt-1">
              Please enter a valid matric number e.g 19/112/0043
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col mt-5 gap-y-1.25">
          <h4 className="font-medium text-[14px] text-[#122354]">Password</h4>
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

        <p className="text-[#122354] font-semibold text-[12px] flex justify-end text-end mt-2">
          Forgot Password
        </p>

        {/* LOGIN BUTTON */}
        <div
          onClick={!isLoginLoading && isFormFilled ? handleLogin : undefined}
          className={`flex items-center justify-center w-full h-12.75 rounded-[10px] py-3.75 px-2.5 mt-6 transition-opacity duration-300
            ${isFormFilled && !isLoginLoading ? "bg-[#122354] opacity-100 cursor-pointer" : "bg-[#122354] opacity-40 cursor-not-allowed"}`}
        >
          {isLoginLoading ? (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white dot-1" />
              <div className="w-2 h-2 rounded-full bg-white dot-2" />
              <div className="w-2 h-2 rounded-full bg-white dot-3" />
            </div>
          ) : (
            <>
              <button
                disabled={!isFormFilled}
                className="font-semibold text-[14px] text-white"
              >
                Login
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 w-full mt-2.5">
          <div className="flex-1 h-px bg-[#817E7E]" />
          <p className="font-normal text-[12px] text-[#817E7E]">
            or login with
          </p>
          <div className="flex-1 h-px bg-[#817E7E]" />
        </div>

        <button className="w-full h-12.75 rounded-[10px] border bg-[#FCFDFF] font-semibold text-[16px] mt-4">
          👆 Use Biometric / Fingerprint
        </button>

        <p className="font-normal text-[12px] text-[#817E7E] flex items-center text-center justify-center mt-1.5 mx-auto">
          Don't have an account?{" "}
          <span className="font-medium text-[12px] text-[#122354]">
            Sign Up
          </span>
        </p>
      </div>
    </>
  );
};

export default SignIn;
