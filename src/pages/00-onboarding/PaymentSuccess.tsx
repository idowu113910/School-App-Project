import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface PaymentSuccessProps {
  onBackToHome: () => void;
}



const PaymentSuccess = ({ onBackToHome }: PaymentSuccessProps) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#1E3A8A] px-6">
      {/* CONFETTI AREA */}
      <div className="mb-8"></div>

      {/* WHITE CIRCLE WITH CHECKMARK */}
      <motion.div
        className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <motion.svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.2 }}
        >
          <path
            d="M5 13l4 4L19 7"
            stroke="#1E3A8A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>

      {/* TEXT */}
      <p className="font-medium text-[20px] text-[#A3AECF] tracking-widest uppercase mb-1.5 mt-7 ">
        Payment Successful
      </p>
      <h2 className="font-semibold text-[24px] text-white text-center mb-1.5 ml-4">
        Congratulations, Odafe! 🎉
      </h2>
      <p className="font-normal text-[12px] text-[#A3AECF] text-center px-4">
        Your school fees has been paid successfully. You're all set for this
        term
      </p>

      {/* BUTTONS */}
      <div className="flex flex-col w-full gap-3 mt-12">
        <button className="w-full h-12.75 rounded-[10px] bg-[#F59E0B] text-[#122354] font-medium text-[14px]">
          View Receipt
        </button>
        <button
          onClick={onBackToHome}
          className="w-full h-12.75 rounded-[10px] bg-[#FFFFFF] text-[#122354] font-medium text-[14px]"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
