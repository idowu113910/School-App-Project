import { IoArrowForwardOutline } from "react-icons/io5";
import HeaderCurve from "../../layout/HeaderCurve";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Pin = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-white flex items-center justify-center">
        <div className="flex items-center gap-1.5" role="status">
          <div className="w-2 h-2 rounded-full bg-[#122354] dot-1" />
          <div className="w-2 h-2 rounded-full bg-[#122354] dot-2" />
          <div className="w-2 h-2 rounded-full bg-[#122354] dot-3" />
        </div>
      </div>
    );
  }

  return (
    <>
      <HeaderCurve />
      <div className="flex flex-col p-6 items-center text-center mt-6">
        <div>
          <h1 className="font-semibold text-[#1E3A8A] text-[20px]">
            Payment PIN Setup
          </h1>
          <p className="font-normal text-[12px] text-[#817E7E] px-2 mt-2">
            {user?.email ? `Signed in as ${user.email}.` : ""}
          </p>
        </div>

        <div
          className="w-full mt-8 rounded-[10px] border border-[#FBD79B] bg-[#FEF5E7] p-4 text-left"
          role="status"
        >
          <p className="font-semibold text-[13px] text-[#956007]">
            Payment PIN setup is not configured yet.
          </p>
          <p className="font-normal text-[12px] text-[#726F6F] mt-1">
            No PIN has been saved. Your account is verified through Supabase
            email authentication.
          </p>
        </div>

        <button
          onClick={() => navigate("/home", { replace: true })}
          className="flex items-center justify-center w-full h-12.75 rounded-[10px] py-3.75 px-2.5 gap-1.25 bg-[#122354] text-white mt-8"
        >
          <span className="font-semibold text-[14px]">Continue to Dashboard</span>
          <IoArrowForwardOutline />
        </button>
      </div>
    </>
  );
};

export default Pin;
