import { useNavigate } from "react-router-dom";
import uni from "../../assets/uni.svg";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-dvh bg-[#122354] h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center text-center mt-28">
          <img src={uni} alt="" className="w-42 h-15.75 " />

          <p className="mt-6 text-[14px] font-medium text-[#FFFFFF99] max-w-87.5 w-full">
            Pay all your school fees in one place. Fast, secure and stress free.
          </p>
        </div>

        <div className="flex flex-col mt-24 px-4 w-full">
          <button
            onClick={() => {
              navigate("/verifystudent");
            }}
            className="bg-[#F59E0B] rounded-[7px] py-3.75 px-2.5 w-full border text-[#122354] font-semibold text-[14px]"
          >
            Get Started
          </button>
          <button 
           onClick={() => {
              navigate("/signin");
            }}
          className="rounded-[7px] py-3.75 px-2.5 w-full border border-white text-white font-semibold text-[14px] mt-5">
            I already have an account
          </button>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
