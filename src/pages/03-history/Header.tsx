import { IoReceiptOutline } from "react-icons/io5";

const Header = () => (
  <>
    <div className="relative h-25 w-full overflow-hidden bg-[#122354]">
      <div className="flex items-center justify-center pt-15">
        <h1 className="text-white text-[20px] font-semibold">History</h1>
      </div>
    </div>
    <div className="px-4 w-full pb-28">
      <p className="font-medium text-[14px] text-[#726F6F] text-center mt-3">
        Transaction history
      </p>
      <div className="mt-8 flex flex-col items-center rounded-[10px] border border-[#E7E4E4] bg-white px-5 py-10 text-center">
        <IoReceiptOutline className="text-[#1E3A8A] text-4xl" aria-hidden="true" />
        <h2 className="mt-4 font-semibold text-[16px] text-[#122354]">
          No transaction records available
        </h2>
        <p className="mt-2 font-normal text-[12px] text-[#726F6F]">
          Transaction history will appear here when a verified payment service
          is connected. No sample transactions are shown.
        </p>
      </div>
    </div>
  </>
);

export default Header;
