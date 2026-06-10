import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import warn from "../../assets/warning.svg";
import { CiCalendar } from "react-icons/ci";
import grad from "../../assets/grad.svg";
import clock from "../../assets/clock.svg";
import tuit from "../../assets/Tuition.svg";
import sport from "../../assets/sport.svg";
import { GoLock } from "react-icons/go";

const Header = ({ onPay }: { onPay: () => void }) => {
  const [selectedSession, setSelectedSession] = useState("2023/2024");
  const [selectedSemester, setSelectedSemester] = useState("First Semester");
  const [showSessionDropdown, setShowSessionDropdown] = useState(false);
  const [showSemesterDropdown, setShowSemesterDropdown] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const filterOptions = [
    {
      label: "SESSION",
      key: "session",
      selected: selectedSession,
      setSelected: setSelectedSession,
      showDropdown: showSessionDropdown,
      setShowDropdown: setShowSessionDropdown,
      options: ["2025/2026", "2026/2027", "2028/2029"],
    },
    {
      label: "Semester",
      key: "semester",
      selected: selectedSemester,
      setSelected: setSelectedSemester,
      showDropdown: showSemesterDropdown,
      setShowDropdown: setShowSemesterDropdown,
      options: ["First Semester", "Second Semester", "Third Semester"],
    },
  ];

  const schoolFees = [
    {
      icon: grad,
      title: "Total School Fees",
      subtitle: "2023/2024 First Semester",
      status: "PENDING",
      statusIcon: clock,
      amountDue: "₦120,000.00",
      dueDate: "Oct 30",
      progressPercent: 10,
      progressLabel: "10% Paid",
      paidAmount: "₦ 10,000",
      totalAmount: "₦ 120,000",
    },
  ];

  const feeBreakdown = [
    {
      icon: tuit,
      title: "Tuition Fee",
      subtitle: "Tuition & Enrollment",
      amount: "₦120,000.00",
      status: "Pending",
      paid: false,
    },
    {
      icon: sport,
      title: "Sport",
      subtitle: "Athletics & Facilities",
      amount: "₦15000.00",
      status: "Paid",
      paid: true,
    },
    {
      icon: sport,
      title: "Library Fee",
      subtitle: "Access & Resources",
      amount: "₦12000.00",
      status: "Paid",
      paid: true,
    },
    {
      icon: sport,
      title: "Department Fee",
      subtitle: "Nutrition & Dietetics",
      amount: "₦1200.00",
      status: "Pending",
      paid: false,
    },
    {
      icon: tuit,
      title: "Faculty Fee",
      subtitle: "Faculty of Science",
      amount: "₦1200.00",
      status: "Pending",
      paid: false,
    },
  ];

  const paymentOptions = [
    {
      id: "full",
      title: "Full Payment",
      subtitle: "Pay all pending fees at once",
      amount: "₦120,000.00",
      selectable: false,
    },
    {
      id: "installment",
      title: "Installment",
      subtitle: "3 monthly installments",
      amount: "₦40,000.00",
      selectable: true,
    },
  ];

  return (
    <>
      <div className="relative h-25 w-full overflow-hidden bg-[#122354]">
        <div className="flex items-center justify-center pt-15">
          <h1 className="text-white text-[20px] font-semibold">My Fees</h1>
        </div>
      </div>
      <div className="px-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 px-4">
          {filterOptions.map((filter) => (
            <div key={filter.key} className="relative flex-1 min-w-0 max-w-45">
              <div
                onClick={() => {
                  filter.setShowDropdown(!filter.showDropdown);

                  if (filter.key === "session") {
                    setShowSemesterDropdown(false);
                  } else {
                    setShowSessionDropdown(false);
                  }
                }}
                className="border border-[#E9EBF3] bg-[#E9EBF3] rounded-[7px] py-2 px-3 cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="font-semibold text-xs sm:text-sm text-[#1E3A8A]">
                      {filter.label}
                    </p>

                    <p className="font-medium text-xs sm:text-sm text-black truncate">
                      {filter.selected}
                    </p>
                  </div>

                  <IoChevronDown
                    className={`ml-auto w-3 h-5 text-[#1E3A8A] transition-transform duration-300 shrink-0
            ${filter.showDropdown ? "rotate-180" : ""}`}
                  />
                </div>
              </div>

              {filter.showDropdown && (
                <div
                  className="absolute top-full left-0 w-full bg-white
          border border-[#E9EBF8] rounded-[10px]
          shadow-[0_10px_20px_rgba(0,0,0,0.08)]
          z-50 overflow-hidden mt-1"
                >
                  {filter.options.map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        filter.setSelected(option);
                        filter.setShowDropdown(false);
                      }}
                      className={`px-3 py-2.5 text-xs sm:text-sm cursor-pointer
              border-b border-[#F0F1FA] last:border-none
              ${
                filter.selected === option
                  ? "bg-[#E9EBF3] text-[#1E3A8A] font-semibold"
                  : "text-black hover:bg-[#F5F6FF]"
              }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          className="flex items-start bg-[#FEF5E7] border border-[#FBD79B]
  rounded-[5px] p-3 mx-4 sm:mx-6 mt-4"
        >
          <img
            src={warn}
            alt="Warning"
            className="w-8 h-8 sm:w-10 sm:h-10 shrink-0"
          />

          <div className="flex flex-col ml-2 min-w-0">
            <p className="font-semibold text-[10px] sm:text-xs text-[#956007]">
              Payment Deadline
            </p>

            <p className="font-normal text-[10px] sm:text-xs text-[#726F6F] mt-1 wrap-break-word">
              Complete payment by NOVEMBER 30, 2023
            </p>
          </div>
        </div>

        {schoolFees.map((fee) => (
          <div
            key={fee.title}
            className="mx-4 mt-4 border-l-[5px] border-l-[#F7AE34] rounded-[10px] bg-white shadow-[0_2px_4px_0px_rgba(0,0,0,0.25)] p-4"
          >
            <div className="flex gap-1.25">
              <img src={fee.icon} alt="" />
              <div className="flex flex-col min-w-0 flex-1">
                <p className="font-medium text-black text-[14px] truncate">
                  {fee.title}
                </p>
                <p className="font-medium text-[#726F6F] text-[10px] truncate">
                  {fee.subtitle}
                </p>
              </div>
              <div className="flex border-[0.5px] border-[#F59E0B] rounded-[5px] bg-[#FEF5E7] py-1 px-1.5 gap-1 ml-2 mt-2 shrink-0 items-center">
                <img src={fee.statusIcon} alt="" className="w-3 h-3" />
                <p className="text-[#AC6F08] font-semibold text-[10px]">
                  {fee.status}
                </p>
              </div>
            </div>

            <div className="flex mt-7 justify-between">
              <div className="flex flex-col">
                <p className="font-semibold text-[#726F6F] text-[10px]">
                  AMOUNT DUE
                </p>
                <p className="text-[16px] font-semibold text-black mt-2">
                  {fee.amountDue}
                </p>
              </div>
              <div className="flex flex-col mr-2 items-center">
                <CiCalendar className="text-[#726F6F]" />
                <p className="font-semibold text-[12px] text-black mt-2">
                  {fee.dueDate}
                </p>
              </div>
            </div>

            <div className="border w-full rounded-[10px] py-1.25 px-2.5 border-[#E9EBF3] bg-[#FBFCFF] mt-2">
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-[#726F6F]">
                  PAYMENT PROGRESS
                </p>
                <p className="text-[#152961] text-[10px] font-semibold">
                  {fee.progressLabel}
                </p>
              </div>
              <div className="w-full h-1.5 bg-[#E9EBF8] rounded-full my-1">
                <div
                  className="h-1.5 bg-[#1E3A8A] rounded-full"
                  style={{ width: `${fee.progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between">
                <p className="text-[#726F6F] text-[10px]">
                  paid: {fee.paidAmount}
                </p>
                <p className="text-[#726F6F] text-[10px]">
                  Total: {fee.totalAmount}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="px-4 mt-6 pb-5">
          <p className="font-semibold text-[18px] text-[#1E3A8A] mb-4">
            Fee Breakdown
          </p>

          {feeBreakdown.map((fee) => (
            <div
              key={fee.title}
              className="flex items-center justify-between py-3 border border-[#E9EBF8] rounded-[10px] px-3 mt-3"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10.25 h-[37.19px] rounded-[9.53px] flex items-center justify-center
          ${fee.paid ? "bg-[#E8F8EF]" : "bg-[#FEF5E7]"}`}
                >
                  <img src={fee.icon} alt={fee.title} className="w-5.5 h-5.5" />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-[14px] text-black">
                    {fee.title}
                  </p>
                  <p className="font-normal text-[12px] text-[#726F6F]">
                    {fee.subtitle}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-end gap-1">
                <p className="font-semibold text-[16px] text-black">
                  {fee.amount}
                </p>
                <p
                  className={`font-medium text-[11px] ${fee.paid ? "text-[#108B41]" : "text-[#F59E0B]"}`}
                >
                  {fee.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4">
          <p className="font-semibold text-[18px] text-[#1E3A8A] mb-4">
            Payment Options
          </p>

          {paymentOptions.map((option) => (
            <div
              key={option.id}
              onClick={() =>
                option.selectable ? setSelectedPayment(option.id) : null
              }
              className={`flex items-center justify-between py-4 border-b border-[#F0F1FA] last:border-none
        ${option.selectable ? "cursor-pointer" : "cursor-default"}`}
            >
              <div className="flex items-center gap-3">
                {/* RADIO CIRCLE */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
            ${
              option.selectable && selectedPayment === option.id
                ? "border-[#1E3A8A]"
                : "border-[#C0C0C0]"
            }`}
                >
                  {option.selectable && selectedPayment === option.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A]" />
                  )}
                </div>

                <div className="flex flex-col">
                  <p
                    className={`font-semibold text-[14px] ${option.selectable ? "text-black" : ""}`}
                  >
                    {option.title}
                  </p>
                  <p className="font-normal text-[11px] text-[#726F6F]">
                    {option.subtitle}
                  </p>
                </div>
              </div>

              <p
                className={`font-semibold text-[14px] ${option.selectable ? "text-black" : ""}`}
              >
                {option.amount}
              </p>
            </div>
          ))}

          {/* PAY BUTTON */}
          <div
            onClick={selectedPayment ? onPay : undefined}
            className={`flex items-center justify-center w-full h-12.75 rounded-[10px] gap-2 mt-4 transition-all duration-300
    ${selectedPayment ? "bg-[#F59E0B] cursor-pointer" : "bg-[#F59E0B] opacity-40 cursor-not-allowed"}`}
          >
            <span className="text-white text-[16px]">
              {" "}
              <GoLock />{" "}
            </span>
            <button
              disabled={!selectedPayment}
              className="font-semibold text-[14px] text-white"
            >
              Pay{" "}
              {paymentOptions.find((o) => o.id === selectedPayment)?.amount ??
                "₦40,000.00"}
            </button>
          </div>

          {/* SECURE TEXT */}
          <div className="flex items-center justify-center gap-1 mt-2 pb-30">
            <span className="text-[#817E7E] text-[12px]">🔒</span>
            <p className="font-normal text-[12px] text-[#817E7E]">
              Secure encrypted payment
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
