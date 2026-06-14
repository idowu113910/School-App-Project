import { useEffect, useState } from "react";
import Header from "./Header";
import { IoArrowBackOutline } from "react-icons/io5";
import paste from "../../assets/paste.svg";
import { IoChevronDown } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import bnk from "../../assets/bankk.svg";
import card from "../../assets/card.svg";
import ussd from "../../assets/USSD.svg";
import kbank from "../../assets/kuda bank.svg";
import arr from "../../assets/arr forward.svg";
import PaymentSuccess from "../00-onboarding/PaymentSuccess";


const Home = () => {
  const [showTransfer, setShowTransfer] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const isReadyToPay = amount !== "" && narration !== "";
  const [showTransactionPin, setShowTransactionPin] = useState(false);
  const [transactionPin, setTransactionPin] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setAccountNumber(text.replace(/\D/g, "").slice(0, 10));
    } catch {
      console.error("Paste failed");
    }
  };

  const topUpMethods = [
    {
      icon: bnk,
      title: "Bank Transfer",
      subtitle: "Pay from your bank",
      clickable: true,
    },
    {
      icon: card,
      title: "Card",
      subtitle: "Debit or credit card",
      clickable: false,
    },
    {
      icon: ussd,
      title: "USSD (phone)",
      subtitle: "Dial your bank's code",
      clickable: false,
    },
  ];

  const handleKeyPress = (key: string) => {
    if (key === "delete") {
      setAmount((prev) => prev.slice(0, -1));
    } else if (key === "0" && amount === "") {
      return;
    } else if (amount.length < 10) {
      setAmount((prev) => prev + key);
    }
  };

  const formatAmount = (val: string) => {
    if (!val) return "₦ 0.00";
    const num = parseInt(val);
    return `₦ ${num.toLocaleString()}.00`;
  };

  const handlePinKey = (key: string) => {
    if (key === "delete") {
      setTransactionPin((prev) => {
        const newPin = [...prev];
        const lastFilled = newPin
          .map((v, i) => (v !== "" ? i : -1))
          .filter((i) => i !== -1)
          .pop();
        if (lastFilled !== undefined) newPin[lastFilled] = "";
        return newPin;
      });
    } else {
      setTransactionPin((prev) => {
        const newPin = [...prev];
        const firstEmpty = newPin.findIndex((v) => v === "");
        if (firstEmpty !== -1) newPin[firstEmpty] = key;
        return newPin;
      });
    }
  };

  useEffect(() => {
    if (transactionPin.every((val) => val !== "")) {
      setTimeout(() => {
        setShowTransactionPin(false);
        setShowPaymentSuccess(true);
      }, 300);
    }
  }, [transactionPin]);

  // ✅ PAYMENT SUCCESS — checked before everything else
  if (showPaymentSuccess) {
    return (
      <PaymentSuccess
        onBackToHome={() => {
          setShowPaymentSuccess(false);
          setShowTransactionPin(false);
          setShowAddMoney(false);
          setTransactionPin(["", "", "", ""]);
          setAmount("");
          setNarration("");
        }}
      />
    );
  }

  if (showBankTransfer) {
    return (
      <div className="px-4">
        <div className="flex items-center justify-between py-3 mt-8 w-full">
          <button onClick={() => setShowBankTransfer(false)}>
            <IoArrowBackOutline className="text-white bg-[#122354] w-7 h-7 rounded-[7px] p-1" />
          </button>
          <p className="font-semibold text-[16px] text-[#1E3A8A]">Transfer</p>
          <button className="text-[#FFFFFF] bg-[#122354] font-semibold text-[12px] px-1.5 py-1.25 rounded-lg">
            Share
          </button>
        </div>

        <p className="font-normal text-[14px] text-[#726F6F] flex items-center text-center px-6 mt-4 -ml-3">
          Use the details below to send money to Unipay account from any bank's
          app or through internet banking
        </p>

        <div className="flex flex-col p-4 gap-y-1.25">
          <h5 className="font-medium text-[14px] text-[#122354]">Bank</h5>
          <input
            type="text"
            placeholder="Kuda Microfinance Bank"
            className="rounded-[10px] w-full border py-3.75 px-2.5 border-[#E9EBF8] bg-[#FCFDFF] placeholder:font-normal text-[12px] text-[#817E7E]"
          />
        </div>

        <div className="flex flex-col gap-y-1.25 px-4">
          <h4 className="font-medium text-[14px] text-[#122354]">
            Account number
          </h4>
          <div className="relative w-full">
            <input
              type="text"
              inputMode="numeric"
              placeholder="0926372926"
              value={accountNumber}
              onChange={(e) =>
                setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              className="border rounded-[10px] py-3.75 px-2.5 h-12 border-[#E9EBF8] bg-[#FCFDFF] placeholder:text-[12px] font-normal w-full focus:outline-none text-black focus:border-[#122354] pr-16"
            />
            <button
              onClick={handlePaste}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[#108B41] font-semibold text-[12px]"
            >
              Copy
              <span className="text-[10px] text-[#108B41]">
                <img src={paste} alt="" />
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col p-4 gap-y-1.25 mt-3">
          <h5 className="font-medium text-[14px] text-[#122354]">
            Account Name
          </h5>
          <input
            type="text"
            placeholder="Kuda Microfinance Bank"
            className="rounded-[10px] w-full border py-3.75 px-2.5 border-[#E9EBF8] bg-[#FCFDFF] placeholder:font-normal text-[12px] text-[#817E7E]"
          />
        </div>
      </div>
    );
  }

  if (showAddMoney) {
    if (showPaymentSuccess) {
      return (
        <PaymentSuccess
          onBackToHome={() => {
            setShowPaymentSuccess(false);
            setShowTransactionPin(false);
            setShowAddMoney(false);
            setTransactionPin(["", "", "", ""]);
            setAmount("");
            setNarration("");
          }}
        />
      );
    }

    return (
      <div className="p-6 mt-4 pb-28">
        <div className="flex gap-22 mt-4">
          {/* ✅ FIXED: was setShowTopUp(false), should be setShowAddMoney(false) */}
          <button onClick={() => setShowAddMoney(false)}>
            <IoArrowBackOutline className="text-white bg-[#122354] w-7 h-7 rounded-[7px] p-1" />
          </button>
          <p className="text-[#1E3A8A] font-semibold text-[20px] ml-2">
            Add Money
          </p>
        </div>

        <p className="mt-4 font-medium text-[14px] text-[#726F6F] flex items-center text-center justify-center mx-auto ml-5">
          Moshood Abiola Polytechnic
        </p>

        <div className="flex flex-col px-6 mt-85">
          <div className="flex items-center justify-between mb-2 mt-16">
            <p
              className={`font-medium text-[16px] ${amount ? "text-black" : "text-[#726F6F]"}`}
            >
              {formatAmount(amount)}
            </p>
            <div className="flex items-center gap-[1.84px] px-1 py-1">
              <span className="font-medium text-[12.89px] text-[#726F6F]">
                NGN
              </span>
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                <rect width="20" height="14" rx="2" fill="#008751" />
                <rect x="6.5" width="7" height="14" fill="white" />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 gap-1.25">
            <input
              type="text"
              placeholder="Narration e.g sent from..."
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
              className="flex-1 font-normal text-[13px] text-black placeholder:text-[#817E7E] focus:outline-none bg-transparent"
            />
            <button
              onClick={() =>
                isReadyToPay ? setShowTransactionPin(true) : undefined
              }
              className={`w-10.5 h-[29.56px] rounded-[4.69px] flex items-center justify-center transition-opacity duration-300 shrink-0
                ${isReadyToPay ? "bg-[#122354] opacity-100 cursor-pointer" : "bg-[#122354] opacity-40 cursor-not-allowed"}`}
            >
              <img src={arr} alt="" className="w-[14.96px] h-[12.6px]" />
            </button>
          </div>
        </div>

        {/* KEYPAD */}
        <div className="grid grid-cols-3 gap-3 px-4 mt-4">
          {[
            { label: "1", sub: "" },
            { label: "2", sub: "ABC" },
            { label: "3", sub: "DEF" },
            { label: "4", sub: "GHI" },
            { label: "5", sub: "JKL" },
            { label: "6", sub: "MNO" },
            { label: "7", sub: "PQRS" },
            { label: "8", sub: "TUV" },
            { label: "9", sub: "WXYZ" },
            { label: "", sub: "" },
            { label: "0", sub: "" },
            { label: "delete", sub: "" },
          ].map((key, index) => (
            <button
              key={index}
              onClick={() =>
                key.label ? handleKeyPress(key.label) : undefined
              }
              className={`flex flex-col items-center justify-center h-14 rounded-[10px]
                ${!key.label ? "pointer-events-none" : key.label === "delete" ? "border-none" : "border border-[#7D8DBB]"}`}
            >
              {key.label === "delete" ? (
                <span className="font-medium text-[14px] text-[#122354]">
                  Delete
                </span>
              ) : (
                <>
                  <span className="font-medium text-[20px] text-[#000000]">
                    {key.label}
                  </span>
                  {key.sub && (
                    <span className="text-[9px] text-[#817E7E]">{key.sub}</span>
                  )}
                </>
              )}
            </button>
          ))}
        </div>

        {/* TRANSACTION PIN OVERLAY */}
        {showTransactionPin && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setShowTransactionPin(false)}
            />
            <div className="relative w-full bg-white rounded-t-[20px] px-6 pt-4 pb-8">
              <div className="w-10 h-1 bg-[#E9EBF8] rounded-full mx-auto mb-4" />
              <button
                onClick={() => setShowTransactionPin(false)}
                className="absolute right-4 top-4 w-7 h-7 rounded-full bg-[#E9EBF8] flex items-center justify-center"
              >
                <span className="text-[#122354] text-[14px] font-bold">✕</span>
              </button>
              <p className="font-semibold text-[16px] text-[#122354] text-center mb-4">
                Transaction Pin
              </p>
              <div className="flex gap-4 items-center justify-center mb-6">
                {transactionPin.map((val, index) => (
                  <div
                    key={index}
                    className={`w-5 h-5 rounded-full border-[1.5px] transition-all duration-300
                      ${val ? "bg-[#122354] border-[#122354]" : "border-[#817E7E]"}`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "1", sub: "" },
                  { label: "2", sub: "ABC" },
                  { label: "3", sub: "DEF" },
                  { label: "4", sub: "GHI" },
                  { label: "5", sub: "JKL" },
                  { label: "6", sub: "MNO" },
                  { label: "7", sub: "PQRS" },
                  { label: "8", sub: "TUV" },
                  { label: "9", sub: "WXYZ" },
                  { label: "", sub: "" },
                  { label: "0", sub: "" },
                  { label: "delete", sub: "" },
                ].map((key, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      key.label ? handlePinKey(key.label) : undefined
                    }
                    className={`flex flex-col items-center justify-center h-14 rounded-[10px]
                      ${!key.label ? "pointer-events-none" : key.label === "delete" ? "border-none" : "border border-[#7D8DBB]"}`}
                  >
                    {key.label === "delete" ? (
                      <span className="font-medium text-[14px] text-[#122354]">
                        Delete
                      </span>
                    ) : (
                      <>
                        <span className="font-medium text-[20px] text-black">
                          {key.label}
                        </span>
                        {key.sub && (
                          <span className="text-[9px] text-[#817E7E]">
                            {key.sub}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (showTransfer) {
    return (
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between px-4 py-3 mt-8 w-full">
          <button onClick={() => setShowTransfer(false)}>
            <IoArrowBackOutline className="text-white bg-[#122354] w-7 h-7 rounded-[7px] p-1" />
          </button>
          <p className="font-semibold text-[16px] text-[#1E3A8A]">
            Send to Kuda
          </p>
          <button
            onClick={() => setShowAddMoney(true)}
            className="text-[#FFFFFF] bg-[#122354] font-semibold text-[12px] px-1.5 py-1.25 rounded-lg"
          >
            Share
          </button>
        </div>

        <p className="font-normal text-[14px] text-[#817E7E] text-center px-4 mt-2">
          Send to the school account number only
        </p>

        <div className="flex flex-col mt-5 gap-y-1.25 px-4">
          <h4 className="font-medium text-[14px] text-[#122354]">
            Account number
          </h4>
          <div className="relative w-full">
            <input
              type="text"
              inputMode="numeric"
              placeholder="0926372928"
              value={accountNumber}
              onChange={(e) =>
                setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              className="border rounded-[10px] py-3.75 px-2.5 h-12 border-[#E9EBF8] bg-[#FCFDFF] placeholder:text-[12px] font-normal w-full focus:outline-none text-black focus:border-[#122354] pr-16"
            />
            <button
              onClick={handlePaste}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[#108B41] font-semibold text-[12px]"
            >
              PASTE
              <span className="text-[10px] text-[#108B41]">
                <img src={paste} alt="" />
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col mt-5 gap-y-1.25 px-4">
          <h4 className="font-medium text-[14px] text-[#122354]">Bank</h4>
          <div className="relative w-full">
            <div className="w-full h-12 border border-[#E9EBF8] bg-[#FCFDFF] rounded-[10px] px-2.5 pr-10 flex items-center gap-3">
              <img src={kbank} alt="" />
            </div>
            <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#817E7E] text-xl pointer-events-none" />
          </div>
        </div>
      </div>
    );
  }

  if (showTopUp) {
    return (
      <div className="p-6">
        <div className="flex gap-22 mt-4">
          <button onClick={() => setShowTopUp(false)}>
            <IoArrowBackOutline className="text-white bg-[#122354] w-7 h-7 rounded-[7px] p-1" />
          </button>
          <p className="text-[#1E3A8A] font-semibold text-[20px]">Add Money</p>
        </div>

        <p className="font-medium text-[#726F6F] text-[14px] ml-8.5 mt-4">
          Add money through the various process
        </p>

        <div className="flex flex-col mt-6 px-4 gap-2">
          {topUpMethods.map((method) => (
            <div
              key={method.title}
              onClick={
                method.clickable ? () => setShowBankTransfer(true) : undefined
              }
              className={`flex items-center justify-between p-2.5 rounded-[10px] gap-y-2.25 -ml-5
                ${method.clickable ? "cursor-pointer" : "cursor-not-allowed"}`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={method.icon}
                  alt={method.title}
                  className="w-[38.81px] h-[34.5px]"
                />
                <div className="flex flex-col">
                  <p
                    className={`font-medium text-[14px] ${method.clickable ? "text-[#000000]" : ""}`}
                  >
                    {method.title}
                  </p>
                  <p className="font-normal text-[12px] text-[#817E7E]">
                    {method.subtitle}
                  </p>
                </div>
              </div>
              <IoIosArrowForward className="text-lg text-[#757575]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pb-28">
        <Header
          onTransfer={() => setShowTransfer(true)}
          onTopUp={() => setShowTopUp(true)}
        />
      </div>
    </>
  );
};

export default Home;
