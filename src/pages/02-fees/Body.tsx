import { IoArrowBackOutline } from "react-icons/io5";

const Body = ({ onBack }: { onBack: () => void }) => (
  <div className="px-6 mt-8 pb-28">
    <div className="relative flex items-center justify-center mt-4">
      <button onClick={onBack} className="absolute left-0" aria-label="Go back">
        <IoArrowBackOutline className="text-white bg-[#122354] w-7 h-7 rounded-[7px] p-1" />
      </button>
      <h1 className="text-[#1E3A8A] font-semibold text-[20px]">Payment</h1>
    </div>
    <div
      className="mt-8 rounded-[10px] border border-[#FBD79B] bg-[#FEF5E7] p-4"
      role="status"
    >
      <p className="font-semibold text-[13px] text-[#956007]">
        Payment processing is not connected.
      </p>
      <p className="font-normal text-[12px] text-[#726F6F] mt-2">
        No card details or payment PIN should be entered here. No payment has
        been made.
      </p>
    </div>
  </div>
);

export default Body;
