import lab from "../../assets/lab fee.svg";
import lib from "../../assets/library.svg";
import adm from "../../assets/admin.svg";
import fac from "../../assets/fac.svg";
import ID from "../../assets/ID.svg";
import { useState } from "react";
import back from "../../assets/back.svg";
import { IoArrowBackOutline } from "react-icons/io5";

const Header = () => {
  const [activeScreen, setActiveScreen] = useState<string | null>(null);

  const transactions = [
    {
      id: 1,
      icon: lab,
      title: "Laboratory Fee",
      date: "Oct 24, 10:23 Am",
      amount: "12000.00",
      status: "Completed",
      type: "debit",
      onClick: undefined,
    },
    {
      id: 2,
      icon: lib,
      title: "Library Fee",
      date: "Oct 24, 10:23 Am",
      amount: "10000.00",
      status: "Completed",
      type: "credit",
      onClick: undefined,
    },
    {
      id: 3,
      icon: adm,
      title: "Admin Fee",
      date: "Oct 24, 10:23 Am",
      amount: "1200.00",
      status: "Completed",
      type: "debit",
      onClick: () => setActiveScreen("admin-fee"),
      // replace with your action
    },
  ];

  const transaction = [
    {
      id: 1,
      icon: fac,
      title: "Faculty Fee",
      date: "Oct 24, 10:23 Am",
      amount: "1200.00",
      status: "Completed",
      type: "debit",
      onClick: undefined,
    },
    {
      id: 2,
      icon: ID,
      title: "ID Card Refund",
      date: "Oct 24, 10:23 Am",
      amount: "10000.00",
      status: "Completed",
      type: "credit",
      onClick: () => setActiveScreen("id-card-refund"), // replace with your action
    },
    {
      id: 3,
      icon: adm,
      title: "Admin Fee",
      date: "Oct 24, 10:23 Am",
      amount: "1200.00",
      status: "Completed",
      type: "debit",
      onClick: undefined,
    },
  ];

  if (activeScreen === "admin-fee") {
    return (
      <div className="px-4 mt-8 pb-28">
        {/* Header */}
        <div className="relative flex items-center justify-center mt-4">
          <button
            onClick={() => setActiveScreen(null)}
            className="absolute left-0"
          >
            <IoArrowBackOutline className="text-white bg-[#122354] w-7 h-7 rounded-[7px] p-1" />
          </button>
          <p className="text-[#1E3A8A] font-semibold text-[20px]">
            Transaction
          </p>
        </div>

        <p className="font-medium text-[14px] text-[#726F6F] text-center mt-1">
          Payment details
        </p>

        {/* Card with green left border */}
        <div className="relative mt-6 rounded-xl border border-[#E7E4E4] bg-white overflow-hidden">
          {/* Green left border accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#16A34A] rounded-l-xl" />

          <div className="flex flex-col items-center py-8 px-6">
            {/* Icon */}
            <div>
              <img src={adm} alt="" className="w-10.75 h-9" />
            </div>

            <p className="font-normal text-[10px] text-[#726F6F]">
              You received
            </p>
            <p className="font-semibold text-[16px] text-black mt-1">
              Admin Fee
            </p>
            <p className="font-semibold text-[30.67px] text-[#F11010] mt-1">
              - ₦1200.00
            </p>
            <p className="font-normal text-[12px] text-[#726F6F] mt-1">
              October 25, 2023 • 05:23 Pm
            </p>
          </div>
        </div>

        {/* Details list */}
        <div className="mt-4 flex flex-col">
          {[
            {
              label: "Status",
              value: "✓  Completed",
              valueColor: "text-[#16A34A]",
            },
            {
              label: "Fee Type",
              value: "Admin Fee",
              valueColor: "text-black",
            },
            {
              label: "Semester",
              value: "First Semester 2023/2024",
              valueColor: "text-black",
            },
            {
              label: "Payment Method",
              value: "Bank Transfer",
              valueColor: "text-black",
            },
            {
              label: "Reference",
              value: "TNX-2023-00122",
              valueColor: "text-black",
            },
            {
              label: "Amount",
              value: "- ₦1200.00",
              valueColor: "text-[#F11010]",
            },
          ].map((row, i) => (
            <div
              key={i}
              className="flex justify-between py-3 border-b border-[#E7E4E4]"
            >
              <p className="font-normal text-[14px] text-[#7B7878]">
                {row.label}
              </p>
              <p className={`font-semibold text-[13.42px] ${row.valueColor}`}>
                {row.value}
              </p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-25.25 justify-between mt-8">
          <button className="py-3 px-3.5 whitespace-nowrap h-11.25 w-28.75 rounded-[10px] border border-[#122354] bg-white text-[#122354] font-medium text-[14px]">
            Report issue
          </button>
          <button className="py-3 px-3.5 whitespace-nowrap  h-11.25 w-30.75 rounded-[10px] bg-[#122354] text-white font-medium text-[14px]">
            Share receipt
          </button>
        </div>
      </div>
    );
  }

  if (activeScreen === "id-card-refund") {
    return (
      <div className="px-4 mt-8 pb-28">
        {/* Header */}
        <div className="relative flex items-center justify-center mt-4">
          <button
            onClick={() => setActiveScreen(null)}
            className="absolute left-0"
          >
            <IoArrowBackOutline className="text-white bg-[#122354] w-7 h-7 rounded-[7px] p-1" />
          </button>
          <p className="text-[#1E3A8A] font-semibold text-[20px]">
            Transaction
          </p>
        </div>

        <p className="font-medium text-[14px] text-[#726F6F] text-center mt-1">
          Payment details
        </p>

        {/* Card with green left border */}
        <div className="relative mt-6 rounded-xl border border-[#E7E4E4] bg-white overflow-hidden">
          {/* Green left border accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#16A34A] rounded-l-xl" />

          <div className="flex flex-col items-center py-8 px-6">
            {/* Icon */}
            <div className="w-12 h-12 rounded-[10px] bg-[#DCFCE7] flex items-center justify-center mb-3">
              <img src={ID} alt="" className="w-6 h-6" />
            </div>

            <p className="font-normal text-[10px] text-[#726F6F]">
              You received
            </p>
            <p className="font-semibold text-[16px] text-black mt-1">
              ID Card Refund
            </p>
            <p className="font-semibold text-[30.67px] text-[#108B41] mt-1">
              + ₦10000.00
            </p>
            <p className="font-normal text-[12px] text-[#726F6F] mt-1">
              October 25, 2023 • 05:23 Pm
            </p>
          </div>
        </div>

        {/* Details list */}
        <div className="mt-4 flex flex-col">
          {[
            {
              label: "Status",
              value: "✓ Received",
              valueColor: "text-[#16A34A]",
            },
            {
              label: "Refund Type",
              value: "ID Card Overpayment",
              valueColor: "text-black",
            },
            {
              label: "Processed by",
              value: "Finance Department",
              valueColor: "text-black",
            },
            {
              label: "Credited to",
              value: "Student Wallet",
              valueColor: "text-black",
            },
            {
              label: "Reference",
              value: "REF-2023-00122",
              valueColor: "text-black",
            },
            {
              label: "Amount",
              value: "+ ₦10000.00",
              valueColor: "text-[#16A34A]",
            },
          ].map((row, i) => (
            <div
              key={i}
              className="flex justify-between py-3 border-b border-[#E7E4E4]"
            >
              <p className="font-normal text-[14px] text-[#7B7878]">
                {row.label}
              </p>
              <p className={`font-semibold text-[13.42px] ${row.valueColor}`}>
                {row.value}
              </p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-25.25 justify-between mt-8">
          <button className="py-3 px-3.5 whitespace-nowrap h-11.25 w-28.75 rounded-[10px] border border-[#122354] bg-white text-[#122354] font-medium text-[14px]">
            Report issue
          </button>
          <button className="py-3 px-3.5 whitespace-nowrap  h-11.25 w-30.75 rounded-[10px] bg-[#122354] text-white font-medium text-[14px]">
            Share receipt
          </button>
        </div>
      </div>
    );
  }

  const TransactionCard = ({ item }: { item: (typeof transactions)[0] }) => (
    <div
      onClick={item.onClick}
      className={`flex items-center border border-[#E7E4E4] bg-[#FFFFFF] rounded-[10px] p-2.5 w-full gap-2 ${item.onClick ? "cursor-pointer active:opacity-70" : ""}`}
    >
      <img src={item.icon} alt="" className="w-9 h-9 shrink-0" />
      <div className="flex justify-between items-center flex-1 min-w-0">
        <div className="flex flex-col gap-0.75">
          <p className="font-semibold text-black text-[14px] leading-tight">
            {item.title}
          </p>
          <p className="font-normal text-[12px] text-[#726F6F]">{item.date}</p>
        </div>
        <div className="flex flex-col items-end gap-0.75 shrink-0 pl-2">
          <p
            className={`font-semibold text-[14px] ${item.type === "credit" ? "text-[#16A34A]" : "text-[#F11010]"}`}
          >
            {item.type === "credit" ? "+" : "—"}
            {item.amount}
          </p>
          <p
            className={`font-medium text-[10px] ${item.type === "credit" ? "text-[#16A34A]" : "text-[#F11010]"}`}
          >
            {item.status}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="relative h-25 w-full overflow-hidden bg-[#122354]">
        <div className="flex items-center justify-center pt-15">
          <h1 className="text-white text-[20px] font-semibold">History</h1>
        </div>
      </div>

      <div className="px-4 w-full">
        <h4 className="font-medium text-[14px] text-[#726F6F] text-center mt-3">
          Track your spending
        </h4>

        {/* Filter pills */}
        <div className="flex gap-2 mt-3 w-full justify-between">
          <p className="border bg-[#122354] py-1.25 px-3 rounded-[40px] text-white font-medium text-[12px] whitespace-nowrap">
            All
          </p>
          <p className="border bg-[#FFFFFF] border-[#E7E4E4] py-1.25 px-3 rounded-[40px] text-[#122354] text-[12px] font-medium whitespace-nowrap">
            Refund
          </p>
          <p className="border bg-[#FFFFFF] border-[#E7E4E4] py-1.25 px-3 rounded-[40px] text-[#122354] text-[12px] font-medium whitespace-nowrap">
            Pending
          </p>
          <p className="border bg-[#FFFFFF] border-[#E7E4E4] py-1.25 px-3 rounded-[40px] text-[#122354] text-[12px] font-medium whitespace-nowrap">
            Completed
          </p>
        </div>

        {/* October section */}
        <div className="flex items-center gap-3 mt-7">
          <p className="text-[#959393] text-[12px] font-semibold whitespace-nowrap">
            OCTOBER 2023
          </p>
          <div className="flex-1 h-[0.5px] bg-[#848181]" />
        </div>

        <div className="flex flex-col gap-3 mt-2">
          {transactions.map((item) => (
            <TransactionCard key={item.id} item={item} />
          ))}
        </div>

        {/* November section */}
        <div className="flex items-center gap-3 mt-4">
          <p className="text-[#959393] text-[12px] font-semibold whitespace-nowrap">
            NOVEMBER 2023
          </p>
          <div className="flex-1 h-[0.5px] bg-[#848181]" />
        </div>

        <div className="flex flex-col gap-3 mt-2 pb-28">
          {transaction.map((item) => (
            <TransactionCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
