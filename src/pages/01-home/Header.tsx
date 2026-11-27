import pic from "../../assets/pic.svg";
import not from "../../assets/notification.svg";
import wall from "../../assets/wallet.svg";
import warn from "../../assets/warning.svg";
import grad from "../../assets/grad.svg";
import cal from "../../assets/cal.svg";
import lab from "../../assets/lab fee.svg";
import lib from "../../assets/library.svg";
import { useState } from "react";
import { TbEyeOff } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const [showBalance, setShowBalance] = useState(true);
  const { user } = useAuth();

  return (
    <>
      <div className="flex items-center justify-between w-full px-4 py-6">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={pic}
            alt=""
            className="w-12 h-12 rounded-full object-cover shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <h1 className="font-semibold text-[16px] text-[#122354]">
              WELCOME
            </h1>
            <p className="font-medium text-[14px] text-[#122354] truncate">
              {user?.email ?? "Student"}
            </p>
            <p className="font-medium text-[12px] text-[#6F6C6C] truncate">
              Student verification unavailable
            </p>
          </div>
        </div>
        <img src={not} alt="Notifications" className="w-6 h-6 shrink-0" />
      </div>

      <div className="px-4 overflow-x-hidden">
        <div className="bg-[#122354] w-full rounded-[20px] px-4 py-4 sm:px-5">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <h2 className="font-medium text-sm text-white">
                Available Balance
              </h2>
              <button
                type="button"
                aria-label={showBalance ? "Hide balance" : "Show balance"}
                onClick={() => setShowBalance((visible) => !visible)}
              >
                {showBalance ? (
                  <IoEyeOutline className="text-white" />
                ) : (
                  <TbEyeOff className="text-white" />
                )}
              </button>
            </div>
            <div className="flex items-center rounded-[20px] px-2 py-1 bg-white/20 gap-1">
              <img src={wall} alt="" className="w-4 h-4" />
              <p className="font-semibold text-[10px] text-white whitespace-nowrap">
                ACCOUNT SUMMARY
              </p>
            </div>
          </div>

          <p className="font-normal text-2xl sm:text-3xl text-white mt-4">
            {showBalance ? "Unavailable" : "••••••••"}
          </p>
          <p className="font-normal text-[11px] text-white/70 mt-1">
            Wallet service is not connected.
          </p>
          <div className="flex gap-3 sm:gap-5 mt-4">
            <button
              type="button"
              disabled
              className="flex-1 py-2 rounded-[10px] bg-[#E9EBF3] text-sm font-semibold text-[#817E7E] opacity-70 cursor-not-allowed"
              title="Transfers are unavailable until a payment provider is connected."
            >
              Transfer unavailable
            </button>
            <button
              type="button"
              disabled
              className="flex-1 py-2 rounded-[10px] bg-[#E9EBF3] text-sm font-semibold text-[#817E7E] opacity-70 cursor-not-allowed"
              title="Top-ups are unavailable until a payment provider is connected."
            >
              Top up unavailable
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="flex items-center w-full border bg-[#FEF5E7] rounded-[10px] px-4 py-3 border-[#FBD79B]">
          <img src={warn} alt="" className="w-[38.81px] h-[34.5px] shrink-0" />
          <div className="flex flex-col ml-3">
            <p className="font-semibold text-[13px] text-[#956007]">
              Billing unavailable
            </p>
            <p className="font-normal text-[11px] text-[#726F6F]">
              No school fee or payment data is connected.
            </p>
          </div>
        </div>
      </div>

      <section className="px-4 mt-4" aria-labelledby="due-payments-heading">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h2
              id="due-payments-heading"
              className="font-semibold text-[18px]"
            >
              Due Payments
            </h2>
            <p className="font-medium text-[10px] text-[#726F6F]">
              Student billing data is not connected
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 mx-1 mt-4 rounded-[10px] border border-[#E9EBF3] bg-white p-4">
          <img src={grad} alt="" className="w-10 h-10" />
          <p className="font-normal text-[12px] text-[#726F6F]">
            No verified fee information is available.
          </p>
          <img src={cal} alt="" className="w-6 h-6 ml-auto" />
        </div>
      </section>

      <section className="px-4 mt-6 pb-6" aria-labelledby="recent-activity-heading">
        <div className="flex items-center gap-3">
          <img src={lab} alt="" className="w-8 h-8" />
          <div>
            <h2 id="recent-activity-heading" className="font-semibold text-[16px] text-[#122354]">
              Recent Activity
            </h2>
            <p className="font-normal text-[12px] text-[#726F6F]">
              Transaction history is not connected.
            </p>
          </div>
          <img src={lib} alt="" className="w-8 h-8 ml-auto" />
        </div>
      </section>
    </>
  );
};

export default Header;
