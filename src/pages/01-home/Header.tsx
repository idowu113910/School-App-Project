import pic from "../../assets/pic.svg";
import not from "../../assets/notification.svg";
import wall from "../../assets/wallet.svg";
import { IoArrowUpCircle } from "react-icons/io5";
import { TbEyeOff } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { GoPlusCircle } from "react-icons/go";
import { useState } from "react";
import warn from "../../assets/warning.svg";
import grad from "../../assets/grad.svg";
import pend from "../../assets/clock.svg";
import cal from "../../assets/cal.svg";
import dpt from "../../assets/dpt.svg";
import lab from "../../assets/lab fee.svg";
import lib from "../../assets/library.svg";

const Header = ({
  onTransfer,
  onTopUp,
}: {
  onTransfer: () => void;
  onTopUp: () => void;
}) => {
  const [showBalance, setShowBalance] = useState(true);

  const duePayments = [
    {
      icon: grad,
      title: "School Fees",
      subtitle: "Tuition & Enrollment",
      amount: "₦120,000.00",
      date: "Oct 30",
      status: "PENDING",
    },
    {
      icon: dpt,
      title: "Department Fee",
      subtitle: "Nutrition and Dietetics",
      amount: "₦120,000.00",
      date: "Oct 30",
      status: "PENDING",
    },
  ];

  const recentActivity = [
    {
      icon: lab,
      title: "Laboratory Fee",
      date: "Oct 24, 10:23 Am",
      amount: "₦12000.00",
      type: "debit",
      status: "Completed",
    },
    {
      icon: lib,
      title: "Library Refund",
      date: "Oct 25, 05:23 Am",
      amount: "₦10000.00",
      type: "credit",
      status: "Refund",
    },
    {
      icon: lab,
      title: "Admin Fee",
      date: "Oct 28, 10:23 Am",
      amount: "₦1200.00",
      type: "debit",
      status: "Completed",
    },
    {
      icon: lib,
      title: "Faculty Fee",
      date: "Nov 24, 10:23 Am",
      amount: "₦1200.00",
      type: "debit",
      status: "Completed",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between w-full px-4 py-6">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={pic}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <h4 className="font-semibold text-[16px] text-[#122354]">
              WELCOME BACK
            </h4>
            <p className="font-medium text-[14px] text-[#122354] truncate">
              Odafe Samuel
            </p>
            <p className="font-medium text-[12px] text-[#6F6C6C] truncate">
              Matric number : 19/112/0045
            </p>
          </div>
        </div>
        <img src={not} alt="Notifications" className="w-6 h-6 shrink-0" />
      </div>

      <div className="px-4 overflow-x-hidden">
        <div className="bg-[#122354] w-full rounded-[20px] px-4 py-4 sm:px-5">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <h5 className="font-medium text-sm text-white">
                Available Balance
              </h5>
              {showBalance ? (
                <IoEyeOutline
                  className="text-white cursor-pointer"
                  onClick={() => setShowBalance(false)}
                />
              ) : (
                <TbEyeOff
                  className="text-white cursor-pointer"
                  onClick={() => setShowBalance(true)}
                />
              )}
            </div>
            <div className="flex items-center rounded-[20px] px-2 py-1 bg-white/20 gap-1">
              <img src={wall} alt="" className="w-4 h-4" />
              <p className="font-semibold text-[10px] text-white whitespace-nowrap">
                STUDENT WALLET
              </p>
            </div>
          </div>

          <p className="font-normal text-2xl sm:text-3xl text-white mt-4">
            {showBalance ? "₦52,000.00" : "••••••••"}
          </p>

          <div className="flex gap-3 sm:gap-5 mt-4">
            <div
              onClick={onTransfer}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-[10px] bg-[#E9EBF3] cursor-pointer"
            >
              <IoArrowUpCircle className="text-[#122354]" />
              <button className="font-semibold text-sm text-[#122354]">
                Transfer
              </button>
            </div>

            <div
              onClick={onTopUp}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-[10px] bg-[#E9EBF3] cursor-pointer"
            >
              <GoPlusCircle className="text-[#122354]" />
              <button className="font-semibold text-sm text-[#122354]">
                Top up
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="flex items-center justify-between w-full border bg-[#FEF5E7] rounded-[10px] px-4 py-3 border-[#FBD79B]">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center shrink-0">
              <img src={warn} alt="" className="w-[38.81px] h-[34.5px]" />
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-[13px] text-[#956007]">
                Action Required
              </p>
              <p className="font-normal text-[11px] text-[#726F6F]">
                3 payments due soon
              </p>
            </div>
          </div>
          <button className="bg-[#122354] text-white font-semibold text-[12px] px-4 py-2 rounded-lg">
            View
          </button>
        </div>
      </div>

      <div className="px-4.5 flex justify-between mt-4">
        <div className="flex flex-col gap-y-0.75">
          <p className="font-semibold text-[18px]">Due Payments</p>
          <p className="font-medium text-[10px] text-[#726F6F]">
            Don’t miss the deadlines
          </p>
        </div>

        <p className="mt-4 font-semibold text-[13px] ">See All</p>
      </div>

      {duePayments.map((payment) => (
        <div
          key={payment.title}
          className="border-l-[6px] h-35.75 mx-4 mt-5 border-l-[#F7AE34] rounded-[10px] bg-white shadow-[0_2px_4px_0px_rgba(0,0,0,0.25)]"
        >
          <div className="flex p-4">
            <img src={payment.icon} alt="" className="w-10.25 h-[37.19px]" />
            <div className="flex flex-col ml-2.5">
              <p className="font-semibold text-[#000000] text-[14px]">
                {payment.title}
              </p>
              <p className="font-medium text-[10px] text-[#726F6F]">
                {payment.subtitle}
              </p>
            </div>
            <div className="flex items-center justify-center ml-auto border-[0.5px] rounded-[5px] w-18.75 h-5.75 gap-1.25 border-[#F59E0B] bg-[#FEF5E7]">
              <img src={pend} alt="" className="w-3.5 h-3.5" />
              <p className="font-semibold text-[10px] text-[#AC6F08]">
                {payment.status}
              </p>
            </div>
          </div>
          <div className="flex p-4">
            <div className="flex flex-col gap-2.5">
              <p className="text-[#726F6F] font-semibold text-[10px]">
                AMOUNT DUE
              </p>
              <p className="font-semibold text-[16px] text-black">
                {payment.amount}
              </p>
            </div>
            <div className="flex flex-col ml-auto gap-2.5 items-center text-center mr-2">
              <img src={cal} alt="" className="w-6 h-6" />
              <p className="font-medium text-[12px] text-[#122354]">
                {payment.date}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="px-4 mt-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-[16px] text-[#122354]">
            Recent Activity
          </p>
          <p className="font-medium text-[12px] text-[#122354] cursor-pointer">
            See All
          </p>
        </div>

        {/* LIST */}
        {recentActivity.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between py-3 border-b border-[#F0F1FA] last:border-none"
          >
            <div className="flex items-center gap-1.5">
              <div
                className={`
          ${item.type === "credit" ? "" : ""}`}
              >
                <img src={item.icon} alt={item.title} className="w-10.75 h-9" />
              </div>
              <div className="flex flex-col">
                <p className="font-medium text-[13px] text-black">
                  {item.title}
                </p>
                <p className="font-normal text-[10px] text-[#726F6F]">
                  {item.date}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-0.5">
              <p
                className={`font-semibold text-[13px] ${item.type === "credit" ? "text-[#108B41]" : "text-[#E53935]"}`}
              >
                {item.type === "credit" ? "+ " : "— "}
                {item.amount}
              </p>
              <p
                className={`font-medium text-[10px] ${item.type === "credit" ? "text-[#108B41]" : "text-[#E53935]"}`}
              >
                {item.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Header;
