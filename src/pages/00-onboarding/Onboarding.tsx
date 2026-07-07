import { useState, useEffect } from "react";
import fir from "../../assets/1st.svg";
import sec from "../../assets/2nd.svg";
import third from "../../assets/3rd.svg";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import uni from "../../assets/uni.svg";

const Onboarding = () => {
  const [splashPhase, setSplashPhase] = useState<"dot" | "expand" | "done">(
    "dot",
  );
  const [currentScreen, setCurrentScreen] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const idleTimer = setTimeout(() => setSplashPhase("dot"), 1200); // hold before dot appears
    const expandTimer = setTimeout(() => setSplashPhase("expand"), 1600); // was 800
    const doneTimer = setTimeout(() => setSplashPhase("done"), 4300); // was 3500
    return () => {
      clearTimeout(idleTimer);
      clearTimeout(expandTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  const slides = [
    {
      image: fir,
      title: "Pay Your School Fees Easily",
      description:
        "Pay tuition, faculty, and departmental fees in one place - no queues, no stress",
    },
    {
      image: sec,
      title: "Skip the Queue anywhere",
      description:
        "Pay your school fees and other charges easily without visiting offices or standing in long lines.",
    },
    {
      image: third,
      title: "Fast, Secure and Stress Free",
      description:
        "Make secure payments and get instant confirmation without hassle and zero stress",
    },
  ];

  const handleNext = () => {
    if (currentScreen < slides.length - 1) {
      setCurrentScreen((prev) => prev + 1);
    } else {
      navigate("/home");
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen((prev) => prev - 1);
    }
  };

  const current = slides[currentScreen];

  // PHASE 1 — white screen with small dot
  if (splashPhase === "dot") {
    return (
      <div className="min-h-dvh w-full bg-white flex items-center justify-center overflow-hidden">
        <div className="w-3 h-3 rounded-full bg-[#1E3A8A]" />
      </div>
    );
  }

  // PHASE 2 — circle expands staying circular and covers full screen
  if (splashPhase === "expand") {
    return (
      <div className="h-screen w-full bg-white flex items-center justify-center overflow-hidden relative">
        <motion.div
          className="bg-[#1E3A8A] flex items-center justify-center"
          style={{ borderRadius: "50%", position: "absolute" }}
          initial={{ width: 12, height: 12 }}
          animate={{ width: "200vmax", height: "200vmax" }}
          transition={{ duration: 3.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={uni}
            alt=""
            style={{ width: "192px", flexShrink: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.4 }}
          />
        </motion.div>
      </div>
    );
  }

  // PHASE 3 — onboarding slides
  return (
    <>
      <div className="min-h-dvh flex flex-col items-center justify-center px-4">
        {currentScreen > 0 && (
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 text-[#1E3A8A] text-2xl"
          >
            <IoIosArrowBack />
          </button>
        )}

        {/* IMAGE ANIMATION */}
        <div className="relative w-full max-w-md mx-auto -mt-24 h-64">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentScreen}
              src={current.image}
              alt=""
              className="w-full h-full object-contain absolute"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>
        </div>

        {/* TEXT ANIMATION */}
        <div className="flex flex-col items-center text-center mt-10 gap-3.75">
          <AnimatePresence mode="wait">
            <motion.h2
              key={current.title}
              className="font-bold text-[24px] text-black"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {current.title}
            </motion.h2>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={current.description}
              className="font-normal text-[#484545] text-[18px] w-full px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {current.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* PROGRESS BARS */}
        <div className="flex gap-2 mt-8 items-center">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              style={{
                backgroundColor:
                  currentScreen === index ? "#1E3A8A" : "#A7A5A5",
                borderRadius: "15px",
                height: "5px",
              }}
              animate={{
                width: currentScreen === index ? 25 : 14,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-between items-center w-full max-w-88.25 mx-auto px-2 -mt-26">
        <button
          onClick={() => navigate("/home")}
          className="font-medium text-[20px] text-[#A7A5A5] ml-6"
        >
          Skip
        </button>

        <button
          onClick={() =>
            currentScreen === slides.length - 1
              ? navigate("/getstarted")
              : handleNext()
          }
          className="w-17 h-10.5 rounded-lg py-1.5 px-2.5 bg-[#1E3A8A] text-white"
        >
          {currentScreen === slides.length - 1 ? "Start" : "Next"}
        </button>
      </div>
    </>
  );
};

export default Onboarding;
