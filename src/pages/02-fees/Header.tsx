import warn from "../../assets/warning.svg";
import grad from "../../assets/grad.svg";
import { GoLock } from "react-icons/go";

const Header = () => (
  <>
    <div className="relative h-25 w-full overflow-hidden bg-[#122354]">
      <div className="flex items-center justify-center pt-15">
        <h1 className="text-white text-[20px] font-semibold">My Fees</h1>
      </div>
    </div>
    <div className="px-4 pb-20">
      <div className="flex items-start bg-[#FEF5E7] border border-[#FBD79B] rounded-[5px] p-3 mx-4 mt-4">
        <img
          src={warn}
          alt=""
          className="w-8 h-8 sm:w-10 sm:h-10 shrink-0"
        />
        <div className="flex flex-col ml-2 min-w-0">
          <p className="font-semibold text-[10px] sm:text-xs text-[#956007]">
            Billing is not connected
          </p>
          <p className="font-normal text-[10px] sm:text-xs text-[#726F6F] mt-1">
            Your school has not provided fee or deadline information here.
          </p>
        </div>
      </div>

      <div className="mx-4 mt-5 border-l-[5px] border-l-[#F7AE34] rounded-[10px] bg-white shadow-[0_2px_4px_0px_rgba(0,0,0,0.12)] p-4">
        <div className="flex items-center gap-3">
          <img src={grad} alt="" className="w-10 h-10" />
          <div>
            <h2 className="font-medium text-black text-[14px]">
              School fee information
            </h2>
            <p className="font-medium text-[#726F6F] text-[10px]">
              Not available
            </p>
          </div>
        </div>
        <p className="mt-5 text-[12px] text-[#726F6F]">
          Fee amounts, payment status, academic session, and due dates will
          appear when an authorized school billing source is connected.
        </p>
      </div>

      <div className="px-4 mt-6">
        <h2 className="font-semibold text-[18px] text-[#1E3A8A] mb-4">
          Fee Breakdown
        </h2>
        <div className="rounded-[10px] border border-[#E9EBF8] bg-white p-4">
          <p className="text-[12px] text-[#726F6F]">
            No verified fee items are available.
          </p>
        </div>
      </div>

      <div className="px-4 mt-6">
        <h2 className="font-semibold text-[18px] text-[#1E3A8A] mb-4">
          Payment Options
        </h2>
        <div className="rounded-[10px] border border-[#E9EBF8] bg-white p-4">
          <p className="text-[12px] text-[#726F6F]">
            Payment processing is not connected. No payment can be made from
            this page.
          </p>
        </div>
        <button
          type="button"
          disabled
          className="flex items-center justify-center gap-2 w-full h-12.75 rounded-[10px] mt-4 bg-[#F59E0B] opacity-40 cursor-not-allowed text-white font-semibold text-[14px]"
        >
          <GoLock aria-hidden="true" />
          Payment unavailable
        </button>
      </div>
    </div>
  </>
);

export default Header;
