import { useRef, useState } from "react";
import HeaderCurve from "../../layout/HeaderCurve";
import { IoArrowForwardOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CircleLoader = () => {
  const dots = 10;
  return (
    <div className="relative w-12 h-12">
      {Array.from({ length: dots }).map((_, i) => {
        const angle = (i / dots) * 360;
        const delay = (i / dots) * 1.2;
        const rad = (angle * Math.PI) / 180;
        const x = 50 + 38 * Math.cos(rad);
        const y = 50 + 38 * Math.sin(rad);
        return (
          <div
            key={i}
            className="loader-dot"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};

const Pin = () => {
  const [pinValues, setPinValues] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const isPinFilled = pinValues.every((val) => val !== "");

  const handleConfirmPin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-white flex flex-col">
        <HeaderCurve />
        <div className="flex-1 flex items-center justify-center">
          <CircleLoader />
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="h-screen w-full flex flex-col bg-white">
        <HeaderCurve />
        <div className="flex flex-col items-center px-6 mt-30">
          {/* GREEN CIRCLE */}
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

          {/* WELCOME TEXT */}
          <h2 className="font-semibold text-[20px] text-black text-center mt-12">
            Welcome, Odafe! 🎓
          </h2>
          <p className="font-medium text-[12px] text-[#817E7E] text-center mt-4 px-4">
            Your UniPay account has been created successfully. You're all set to
            pay your fees!
          </p>

          {/* DETAILS CARD */}
          <div className="w-full mt-6 border border-[#E9EBF3] bg-[#E4E9F2] rounded-[10px] h-47.5 overflow-hidden">
            {[
              { label: "Full Name", value: "Samuel Odafe" },
              { label: "Matric Number", value: "19/112/0045" },
              { label: "Department", value: "Nutrition & Dietetics" },
              { label: "Account Status", value: "✓ Active", green: true },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center px-4 py-3 border-b border-[#918E8E] last:border-none"
              >
                <p className="font-normal text-[12px] text-[#817E7E]">
                  {item.label}
                </p>
                <p
                  className={`font-semibold text-black text-[12px]  ${item.green ? "text-green-500" : "text-black"}`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div
            onClick={() => {
              navigate("/signin");
            }}
            className="flex items-center justify-center w-full h-12.75 rounded-[10px] py-3.75 px-2.5 gap-1.25 bg-[#108B41] text-white mt-6 cursor-pointer"
          >
            <button className="font-semibold text-[14px]">
              Go to Dashboard
            </button>
            <IoArrowForwardOutline />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeaderCurve />
      <div className="flex flex-col p-6 items-center text-center mt-6">
        <div>
          <h4 className="font-semibold text-[#1E3A8A] text-[20px]">
            Create Your Pin
          </h4>
          <p className="font-normal text-[12px] text-[#817E7E] px-2">
            Set a 4-digit pin to authorize all your payments. Keep it secret!
          </p>
        </div>

        <div
          className="flex gap-2.75 mt-8 cursor-pointer"
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            type="tel"
            inputMode="numeric"
            maxLength={4}
            autoFocus
            value={pinValues.join("")}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 4);
              setPinValues(
                val.split("").concat(Array(4 - val.length).fill("")),
              );
            }}
            style={{
              position: "absolute",
              opacity: 0,
              width: "1px",
              height: "1px",
            }}
          />
          {pinValues.map((val, index) => (
            <div
              key={index}
              className={`w-5 h-5 rounded-full border-[1.5px] transition-all duration-300
                ${val ? "bg-[#122354] border-[#122354]" : "border-[#817E7E]"}`}
            />
          ))}
        </div>

        <div
          onClick={isPinFilled ? handleConfirmPin : undefined}
          className={`flex items-center justify-center w-full h-12.75 rounded-[10px] py-3.75 px-2.5 gap-1.25 text-white mt-10 transition-opacity duration-300
            ${isPinFilled ? "bg-[#122354] opacity-100 cursor-pointer" : "bg-[#122354] opacity-40 cursor-not-allowed"}`}
        >
          <button disabled={!isPinFilled} className="font-semibold text-[14px]">
            Confirm PIN
          </button>
          <IoArrowForwardOutline />
        </div>
      </div>
    </>
  );
};

export default Pin;
