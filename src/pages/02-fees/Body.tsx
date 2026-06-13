import { IoArrowBackOutline } from "react-icons/io5";
import bankkk from "../../assets/bankkk.svg";
import card from "../../assets/card.svg";
import phone from "../../assets/USSD.svg";
import secure from "../../assets/secure.svg";
import { useEffect, useState } from "react";
import visa from "../../assets/Visa.svg";
import { useNavigate } from "react-router-dom";
import PaymentSuccess from "../00-onboarding/PaymentSuccess";

const Body = ({ onBack }: { onBack: () => void }) => {
  const [isContinueLoading, setIsContinueLoading] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [cvv, setCvv] = useState("");
  const [showPinPad, setShowPinPad] = useState(false);
  const [pin, setPin] = useState("");

  const [selectedMethod, setSelectedMethod] = useState(
    () => localStorage.getItem("selectedMethod") || "",
  );
  const [showPay, setShowPay] = useState(false);
  const [isOn, setIsOn] = useState(
    () => localStorage.getItem("isOn") === "true",
  );
  const [cardNumber, setCardNumber] = useState(
    () => localStorage.getItem("cardNumber") || "",
  );
  const [cardHolder, setCardHolder] = useState(
    () => localStorage.getItem("cardHolder") || "",
  );

  const [expiry, setExpiry] = useState(
    () => localStorage.getItem("expiryDate") || "",
  );

  useEffect(() => {
    localStorage.setItem("selectedMethod", selectedMethod);
  }, [selectedMethod]);

  useEffect(() => {
    localStorage.setItem("cardNumber", cardNumber);
  }, [cardNumber]);

  useEffect(() => {
    localStorage.setItem("cardHolder", cardHolder);
  }, [cardHolder]);

  useEffect(() => {
    localStorage.setItem("isOn", String(isOn));
  }, [isOn]);

  const isCardReady =
    cardNumber.length === 16 &&
    cardHolder.trim() !== "" &&
    expiry.trim() !== "";

  const handleContinueToPay = () => {
    setIsContinueLoading(true);
    setTimeout(() => {
      setIsContinueLoading(false);
      setShowPinPad(true); // open pin pad first
    }, 2000);
  };

  const handlePinComplete = () => {
    setShowPinPad(false);
    setIsContinueLoading(true);
    setTimeout(() => {
      setIsContinueLoading(false);
      setShowPaymentSuccess(true); // navigate to success only after pin
    }, 2000);
  };

  if (showPaymentSuccess) {
    return (
      <PaymentSuccess
        onBackToHome={() => {
          setShowPaymentSuccess(false);
          setShowPay(false);
          setSelectedMethod("");
          setCardNumber("");
          setCardHolder("");
        }}
      />
    );
  }

  if (showPay) {
    return (
      <div className="px-6 mt-8 pb-28">
        <div className="relative flex items-center justify-center mt-4">
          <button onClick={() => setShowPay(false)} className="absolute left-0">
            <IoArrowBackOutline className="text-white bg-[#122354] w-7 h-7 rounded-[7px] p-1" />
          </button>

          <p className="text-[#1E3A8A] font-semibold text-[20px]">
            Card Payment
          </p>
        </div>

        <p className="font-medium text-[14px] text-[#726F6F] mt-4 text-center">
          Enter your card details
        </p>

        <div className="w-full h-42.5 rounded-[10px] bg-[#122354] backdrop-blur-[20px] shadow-[0px_20px_40px_0px_#0000001A] mt-8 p-6">
          <img src={visa} alt="" className="flex ml-auto" />

          <div className="flex gap-7.5 mt-6">
            {[...Array(4)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex gap-2">
                {[...Array(4)].map((_, index) => {
                  const charIndex = groupIndex * 4 + index;
                  const char = cardNumber[charIndex];
                  return (
                    <div
                      key={index}
                      className="w-2 h-2 flex items-center justify-center"
                    >
                      {char ? (
                        <span className="text-[12px] font-bold text-white">
                          {char}
                        </span>
                      ) : (
                        <div className="w-2 h-2 rounded-full border border-white" />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex mt-8 pl-2 justify-between">
            <div className="flex flex-col  ">
              <p className="font-medium text-[#FFFFFF]/60 text-[10px]">
                CARD HOLDER
              </p>
              <p className="font-semibold text-[12px] text-[#FFFFFF]">
                {cardHolder || "FULL NAME"}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="font-medium text-[#FFFFFF]/60 text-[10px]">
                EXPIRY DATE
              </p>
              <p className="font-semibold text-[12px] text-[#FFFFFF]">
                {expiry || "MM/YY"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h5 className="font-semibold text-[12px] text-[#122354]">
            CARD NUMBER
          </h5>
          <div className="relative mt-1.5">
            <input
              type="text"
              maxLength={16}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
              className="h-12.75 w-full rounded-[10px] border border-[#E7E4E4] p-2.5 outline-none  text-transparent caret-transparent"
            />
            <div className="absolute inset-y-0 left-3 flex items-center gap-6 pointer-events-none">
              {[...Array(4)].map((_, groupIndex) => (
                <div key={groupIndex} className="flex gap-2">
                  {[...Array(4)].map((_, index) => {
                    const charIndex = groupIndex * 4 + index;
                    const char = cardNumber[charIndex];
                    return (
                      <div
                        key={index}
                        className="w-2 h-2 flex items-center justify-center"
                      >
                        {char ? (
                          <span className="text-[12px] font-bold text-black">
                            {char}
                          </span>
                        ) : (
                          <div className="w-2 h-2 rounded-full border border-black" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col mt-4 gap-1.5">
            <h4 className="font-semibold text-[12px] text-[#122354]">
              CARD HOLDER NUMBER
            </h4>
            <input
              type="text"
              placeholder="Full name on card"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
              className="h-12.75 w-full rounded-[10px] outline-none border border-[#E7E4E4] p-2.5 placeholder:text-[10px] placeholder:text-[#6A6868] text-black font-normal"
            />
          </div>

          <div className=" flex gap-4.75 mt-4">
            <div className="flex flex-col gap-1.5">
              <h5 className="font-semibold text-[12px] text-[#122354]">
                EXPIRY DATE
              </h5>
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => {
                  const input = e.target.value;

                  // Allow full deletion
                  if (input.length < expiry.length) {
                    setExpiry(input.replace(/\/$/, "")); // strip trailing slash when backspacing
                    return;
                  }

                  let val = input.replace(/\D/g, ""); // strip non-digits
                  if (val.length >= 2) {
                    val = val.slice(0, 2) + "/" + val.slice(2, 4); // insert slash after MM
                  }
                  setExpiry(val);
                }}
                maxLength={5}
                className="w-full h-12.75 rounded-[10px] border border-[#E7E4E4] p-2.5 placeholder:text-[10px] placeholder:text-[#6A6868] text-black font-normal outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <h5 className="font-semibold text-[12px] text-[#122354]">CVV</h5>
              <input
                type="text"
                placeholder="000"
                value={cvv}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, ""); // strip non-digits
                  if (val.length <= 3) setCvv(val);
                }}
                maxLength={3}
                className="w-full h-12.75 rounded-[10px] border border-[#E7E4E4] p-2.5 placeholder:text-[10px] text-[#6A6868] font-normal outline-none"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-14.5 rounded-[10px] p-2.5 gap-1.25 border border-[#E7E4E4] flex mt-1.5">
          <button
            type="button"
            onClick={() => setIsOn(!isOn)}
            className={`relative w-6.5 h-[14.6px] rounded-full transition-all duration-300 mt-3 ${
              isOn ? "bg-[#122354]" : "bg-[#D9D9D9]"
            }`}
          >
            <span
              className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all duration-300 ${
                isOn ? "left-3" : "left-1"
              }`}
            />
          </button>

          <div className="flex flex-col">
            <p className="font-medium text-[12px] text-black">
              Save card for future payment
            </p>
            <p className="font-normal text-[10px] text-[#726F6F] mt-1">
              Faster checkout next time
            </p>
          </div>
        </div>

        <div
          onClick={
            !isContinueLoading && isCardReady ? handleContinueToPay : undefined
          }
          className={`w-full h-13.5 rounded-[7px] py-3.75 px-2.5 items-center text-center mt-5 transition-opacity duration-300
    ${isCardReady && !isContinueLoading ? "bg-[#122354] opacity-100 cursor-pointer" : "bg-[#122354] opacity-40 cursor-not-allowed"}`}
        >
          {isContinueLoading ? (
            <div className="flex items-center justify-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white dot-1" />
              <div className="w-2 h-2 rounded-full bg-white dot-2" />
              <div className="w-2 h-2 rounded-full bg-white dot-3" />
            </div>
          ) : (
            <button
              disabled={!isCardReady}
              className="font-semibold text-[#FFFFFF] text-[14px]"
            >
              Continue to Pay
            </button>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 mt-2">
          <img src={secure} alt="" />

          <p className="font-medium text-[12px] text-[#838181] mt-0.5">
            Secure encrypted payment
          </p>
        </div>

        {showPinPad && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
            <div className="w-full bg-white rounded-t-3xl px-6 pt-4 pb-10">
              {/* Drag handle */}
              <div className="w-10 h-1 bg-[#D9D9D9] rounded-full mx-auto mb-6" />

              {/* Close button */}
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => {
                    setShowPinPad(false);
                    setPin("");
                  }}
                  className="w-7 h-7 rounded-full bg-[#F0F0F0] flex items-center justify-center text-[#122354] font-semibold text-[14px]"
                >
                  ✕
                </button>
              </div>

              {/* Title */}
              <p className="text-center font-medium text-[16px] text-[#122354] mb-6">
                Transaction Pin
              </p>

              {/* Pin dots */}
              <div className="flex justify-center gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                      pin.length > i
                        ? "bg-[#122354] border-[#122354]"
                        : "border-[#122354] bg-transparent"
                    }`}
                  />
                ))}
              </div>

              {/* Keypad */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { num: "1", sub: "" },
                  { num: "2", sub: "ABC" },
                  { num: "3", sub: "DEF" },
                  { num: "4", sub: "GHI" },
                  { num: "5", sub: "JKL" },
                  { num: "6", sub: "MNO" },
                  { num: "7", sub: "PQRS" },
                  { num: "8", sub: "TUV" },
                  { num: "9", sub: "WXYZ" },
                ].map(({ num, sub }) => (
                  <button
                    key={num}
                    onClick={() => {
                      if (pin.length < 4) {
                        const newPin = pin + num;
                        setPin(newPin);
                        if (newPin.length === 4) {
                          setTimeout(() => handlePinComplete(), 300);
                        }
                      }
                    }}
                    className="h-14 rounded-[10px] border border-[#7D8DBB] flex flex-col items-center justify-center gap-0.5"
                  >
                    <span className="font-medium text-[20px] text-[#000000]">
                      {num}
                    </span>
                    {sub && (
                      <span className="text-[9px] text-[#817E7E]">{sub}</span>
                    )}
                  </button>
                ))}

                {/* Bottom row: empty, 0, delete */}
                <div />
                <button
                  onClick={() => {
                    if (pin.length < 4) {
                      const newPin = pin + "0";
                      setPin(newPin);
                      if (newPin.length === 4) {
                        setTimeout(() => handlePinComplete(), 300);
                      }
                    }
                  }}
                  className="h-14 rounded-[10px] border border-[#7D8DBB] flex items-center justify-center"
                >
                  <span className="font-medium text-[20px] text-[#000000]">
                    0
                  </span>
                </button>
                <button
                  onClick={() => setPin((p) => p.slice(0, -1))}
                  className="h-14 rounded-[10px] flex items-center justify-center"
                >
                  <span className="font-medium text-[16px] text-[#122354]">
                    Delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="px-6 mt-8 pb-28">
        <div className="flex gap-21.25 mt-4 items-center">
          <button onClick={onBack}>
            <IoArrowBackOutline className="text-white bg-[#122354] w-7 h-7 rounded-[7px] p-1" />
          </button>

          <p className="text-[#1E3A8A] font-semibold text-[20px] mt-2 ml-2.5">
            Payment
          </p>
        </div>

        <p className="font-medium text-[14px] text-[#726F6F] mt-4 flex  items-center  justify-center">
          Select your preferred method of payment
        </p>

        <div className="border rounded-[10px] h-42.5 bg-[#122354] p-4 mt-8">
          <div className="flex flex-col gap-1.25">
            <h5 className="text-[10px] text-[#FFFFFF]/60">You are paying</h5>
            <p className="font-medium text-[14px] text-[#FFFFFF]">
              Installment 1 of 3{" "}
              <span className="font-medium text-[14px] text-[#FFFFFF]">
                . School Fees
              </span>
            </p>
          </div>

          <p className="font-semibold text-[#FFFFFF] text-[23.78px] mt-2">
            ₦40,000.00
          </p>

          <div className="border-b w-full border-[#FBE9CA] mt-4"></div>

          <div className="flex justify-between mt-1.5">
            <p className="font-medium text-[10px]  text-[#FFFFFF]/60">
              Due date
            </p>
            <p className="font-medium text-[10px] text-[#FFFFFF]">Oct 30</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-[#122354] text-[18px] mt-3">
            Select Method
          </h4>

          <div
            onClick={() => setSelectedMethod("bank")}
            className={`flex mt-6 gap-2.75 rounded-[10px] w-full h-16 p-2.5 cursor-pointer transition-all duration-300
      ${selectedMethod === "bank" ? "bg-[#122354] border border-[#122354]" : ""}`}
          >
            <img src={bankkk} alt="" className="w-[38.81px] h-[34.5px] mt-1" />
            <div className="flex flex-col gap-1.25 mt-1">
              <p
                className={`font-semibold text-[10px] ${selectedMethod === "bank" ? "text-white" : "text-[#000000]"}`}
              >
                Bank Transfer
              </p>
              <p
                className={`font-normal text-[12px] ${selectedMethod === "bank" ? "text-white/70" : "text-[#817E7E]"}`}
              >
                Pay from your bank
              </p>
            </div>
          </div>

          <div className="flex mt-5 gap-2.75 border border-[#E7E4E4] rounded-[10px] w-full h-16 p-2.5">
            <img src={card} alt="" className="w-[38.81px] h-[34.5px] mt-1" />
            <div className="flex flex-col gap-1.25 mt-1">
              <p className="font-semibold text-[10px] text-[#000000]">Card</p>
              <p className="font-normal text-[12px] text-[#817E7E]">
                Debit card or credit card
              </p>
            </div>
          </div>

          <div className="flex mt-4 gap-2.75 border border-[#E7E4E4] rounded-[10px] w-full h-16 p-2.5">
            <img src={phone} alt="" className="w-[38.81px] h-[34.5px] mt-1" />
            <div className="flex flex-col gap-1.25 mt-1">
              <p className="font-semibold text-[10px] text-[#000000]">
                USSD (phone)
              </p>
              <p className="font-normal text-[12px] text-[#817E7E]">
                Dial your bank's code
              </p>
            </div>
          </div>
        </div>

        <div
          onClick={
            selectedMethod === "bank" ? () => setShowPay(true) : undefined
          }
          className={`w-full h-13.5 rounded-[7px] py-3.75 px-2.5 items-center text-center mt-5 transition-opacity duration-300
    ${selectedMethod === "bank" ? "bg-[#122354] opacity-100 cursor-pointer" : "bg-[#122354] opacity-40 cursor-not-allowed"}`}
        >
          <button
            disabled={selectedMethod !== "bank"}
            className="font-semibold text-[#FFFFFF] text-[14px]"
          >
            Continue to Pay
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-2">
          <img src={secure} alt="" />

          <p className="font-medium text-[12px] text-[#838181] mt-0.5">
            Secure encrypted payment
          </p>
        </div>
      </div>
    </>
  );
};

export default Body;
