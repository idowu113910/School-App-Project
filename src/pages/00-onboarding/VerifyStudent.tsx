import { useRef, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoArrowForwardOutline } from "react-icons/io5";
import HeaderCurve from "../../layout/HeaderCurve";
import smile from "../../assets/smile.svg";
import sch from "../../assets/school.svg";
import done from "../../assets/done.svg";
import lock from "../../assets/padlock.svg";
import { useNavigate } from "react-router-dom";

const VerifyStudent = () => {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedSchool, setHighlightedSchool] = useState("");
  const [shake, setShake] = useState(false);
  const [matricNumber, setMatricNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showNextScreen, setShowNextScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [displayDate, setDisplayDate] = useState("");

  const isFormFilled =
    matricNumber !== "" && dateOfBirth !== "" && selectedSchool !== "";

  const schools = [
    "Lagos state university (UNILAG)",
    "Covenant university",
    "Ekiti state university (EKSU)",
    "Yaba college of technology (YABATECH)",
    "Moshood abiola polytechnic (MAPOLY)",
  ];

  const handleSelectSchool = (school: string) => {
    setSelectedSchool("");
    setHighlightedSchool(school);
    setShake(true);
    setTimeout(() => setShake(false), 400);
    setTimeout(() => {
      setSelectedSchool(school);
      setShowDropdown(false);
      setHighlightedSchool("");
    }, 700);
  };

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setShowNextScreen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCalendarClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.type = "date";
      dateInputRef.current.focus();
      dateInputRef.current.showPicker();
    }
  };

  const studentData = {
    fullName: "Odafe Samuel",
    matricNumber: "19/112/0045",
    department: "Nutrition & Dietetics",
    level: "300 Level",
    faculty: "Health Science",
  };

  const fields = [
    { label: "FULL NAME", value: studentData.fullName },
    { label: "MATRIC NUMBER", value: studentData.matricNumber },
    { label: "DEPARTMENT", value: studentData.department },
    { label: "LEVEL", value: studentData.level },
    { label: "FACULTY", value: studentData.faculty },
  ];

  if (showNextScreen) {
    return (
      <>
        <div>
          <HeaderCurve />

          <div className="flex flex-col p-4 mt-10">
            <div className="flex gap-1.25">
              <h2 className="font-semibold text-[22px] text-[#1E3A8A] leading-[100%]">
                We Found You
              </h2>

              <img src={smile} alt="" className="-mt-1.5" />
            </div>
            <p className="font-medium text-[12px] text-[#817E7E] mt-4 w-full">
              Please confirm these details are correct before continuing
            </p>

            <div className="flex bg-[#D9FFE8] w-full border border-[#D9FFE8] rounded-[10px] py-2.5 px-4 items-center gap-3 mt-6">
              <img src={sch} alt="" className="w-6 h-6 shrink-0" />

              <div className="flex flex-col flex-1 min-w-0 ml-5">
                <p className="font-medium text-black text-[14px] truncate">
                  {selectedSchool}
                </p>
                <p className="font-normal text-[12px] text-[#817E7E]">
                  Verified student record found
                </p>
              </div>

              <img src={done} alt="" className="w-6 h-6 shrink-0" />
            </div>
            {fields.map((field, index) => (
              <div
                key={field.label}
                className={`flex flex-col ${index === 0 ? "mt-6" : "mt-3"}`}
              >
                <div className="flex gap-0.75">
                  <h4 className="font-medium text-[14px] text-[#122354]">
                    {field.label}
                  </h4>
                  <img src={lock} alt="" className="w-4 h-4 mt-0.5" />
                </div>
                <input
                  type="text"
                  readOnly
                  value={field.value}
                  className="border rounded-[10px] mt-1.5 py-3.75 px-2.5 h-12 border-[#E9EBF8] bg-[#FCFDFF] text-[12px] font-normal w-full focus:outline-none text-black focus:border-[#122354] cursor-not-allowed"
                />
              </div>
            ))}

            <div className="flex gap-0.75 mt-1.5">
              <img src={lock} alt="" />

              <p className="font-medium text-[#888686] text-[10px] mt-0.5">
                cannot be changed - contact admin
              </p>
            </div>

            {/* YES THIS IS ME */}
            <div
              onClick={() => {
                navigate("/accountsetup");
              }}
              className="flex w-full h-13.5 rounded-[10px] py-3.75 px-2.5 gap-1.25 items-center justify-center mt-6 bg-[#F59E0B] cursor-pointer"
            >
              <button className="font-semibold text-[14px] text-[#122354]">
                Yes, This Is Me
              </button>
              <IoArrowForwardOutline className="text-[#122354]" />
            </div>

            {/* THIS IS NOT ME */}
            <div className="flex w-full h-13.5 rounded-[10px] py-3.75 px-2.5 gap-1.25 items-center justify-center mt-3 bg-[#F0F1FA] cursor-pointer">
              <button className="font-semibold text-[14px] text-[#122354]">
                This Is Not Me
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <HeaderCurve />

        <div className="p-4 mt-10">
          <div className="flex flex-col">
            <h2 className="font-semibold text-[22px] text-[#1E3A8A] leading-[100%]">
              Verify Your Identity
            </h2>
            <p className="font-medium text-[12px] text-[#817E7E] mt-4 max-w-86.75 w-full">
              Enter your matric number and date of birth so we can find your
              school record
            </p>
          </div>

          <div className="gap-y-2.5">
            <div className="flex flex-col mt-8 gap-y-1.25">
              <h4 className="font-medium text-[14px] text-[#122354]">
                Matric Number
              </h4>
              <input
                type="text"
                placeholder="e.g 19/112/0043"
                value={matricNumber}
                onChange={(e) => setMatricNumber(e.target.value)}
                className="border rounded-[10px] py-3.75 px-2.5 h-12 border-[#E9EBF8] bg-[#FCFDFF] placeholder:text-[12px] font-normal w-full focus:outline-none text-black focus:border-[#122354]"
              />
            </div>

            <div className="flex flex-col mt-3 gap-y-1.25">
              <h4 className="font-medium text-[14px] text-[#122354]">
                Date Of Birth
              </h4>

              <div className="relative w-full">
                <input
                  ref={dateInputRef}
                  type="text"
                  placeholder="DD / MM / YYYY"
                  value={displayDate}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.value = dateOfBirth;
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      e.target.type = "text";
                      setDisplayDate("");
                    } else {
                      e.target.type = "text";
                      e.target.value = displayDate;
                    }
                  }}
                  onInput={(e) => {
                    const raw = (e.target as HTMLInputElement).value;
                    setDateOfBirth(raw);
                    if (raw) {
                      const [year, month, day] = raw.split("-");
                      setDisplayDate(`${day} / ${month} / ${year}`);
                    }
                  }}
                  className="w-full h-12 border border-[#E9EBF8] bg-[#FCFDFF] rounded-[10px] py-3.75 px-2.5 pr-10 text-[12px] placeholder:text-[12px] placeholder:text-[#817E7E] font-normal text-black focus:border-[#122354] focus:outline-none appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />

                <CiCalendar
                  onClick={handleCalendarClick}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#817E7E] text-xl cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-y-1.25">
              <h4 className="font-medium text-[14px] text-[#122354]">
                Select Your School
              </h4>
              <div className="relative w-full">
                {/* TRIGGER */}
                <div
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full h-12 border border-[#E9EBF8] bg-[#FCFDFF] rounded-[10px] focus:border-[#122354] focus:outline-none px-2.5 pr-10 flex items-center cursor-pointer overflow-hidden"
                >
                  <span
                    className={`text-[12px] font-normal truncate ${selectedSchool ? "text-black" : "text-[#817E7E]"}`}
                  >
                    {selectedSchool || "Select your school"}
                  </span>
                </div>
                <IoIosArrowDown
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-[#817E7E] text-xl cursor-pointer transition-transform duration-300 ${showDropdown ? "" : ""}`}
                />

                {/* DROPDOWN LIST */}
                {showDropdown && (
                  <div
                    className={`absolute top-14 left-0 w-full bg-white border border-[#E9EBF8] text-[12px] font-medium text-[#1B357E] rounded-[10px] shadow-[0_40px_20px_0px_rgba(0,0,0,0.10)] z-50 overflow-hidden ${shake ? "shake" : ""}`}
                  >
                    {schools.map((school) => (
                      <div
                        key={school}
                        onClick={() => handleSelectSchool(school)}
                        className={`px-4 py-3 text-[13px] cursor-pointer border-b border-[#F0F1FA] last:border-none transition-all duration-500
          ${
            highlightedSchool === school
              ? "bg-[#1E3A8A] text-white opacity-50 rounded-lg border-none mx-2 "
              : selectedSchool === school
                ? "bg-[#1E3A8A] text-white opacity-50 rounded-lg border-none mx-2 pointer-events-none"
                : "text-[#1B357E] hover:bg-[#F5F6FF]"
          }`}
                      >
                        {school}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            onClick={!isLoading && isFormFilled ? handleVerify : undefined}
            className={`flex w-full h-12.75 rounded-[10px] py-3.75 px-2.5 gap-1.25 items-center justify-center mt-6 transition-opacity duration-300
    ${isFormFilled && !isLoading ? "bg-[#122354] opacity-100 cursor-pointer" : "bg-[#122354] opacity-40 cursor-not-allowed"}`}
          >
            {isLoading ? (
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white dot-1" />
                <div className="w-2 h-2 rounded-full bg-white dot-2" />
                <div className="w-2 h-2 rounded-full bg-white dot-3" />
              </div>
            ) : (
              <>
                <button
                  disabled={!isFormFilled}
                  className="font-semibold text-[14px] text-white"
                >
                  Verify My Identity
                </button>
                <IoArrowForwardOutline className="text-white" />
              </>
            )}
          </div>

          <div className="flex items-center text-center justify-center mt-1.5">
            <p className="font-medium text-[12px] text-[#817E7E]">
              ALready have an account?{" "}
              <span className="text-blue-500 font-semibold text-[12px]">
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyStudent;
