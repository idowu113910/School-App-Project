import { useRef, useState } from "react";
import HeaderCurve from "../../layout/HeaderCurve";
import { IoArrowForwardOutline } from "react-icons/io5";

const Pin = () => {
  const [pinValues, setPinValues] = useState(["", "", "", ""]);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPinFilled = pinValues.every((val) => val !== "");

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

        {/* CONFIRM BUTTON */}
        <div
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
