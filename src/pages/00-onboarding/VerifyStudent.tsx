import { useRef, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { IoArrowForwardOutline } from "react-icons/io5";
import HeaderCurve from "../../layout/HeaderCurve";
import smile from "../../assets/smile.svg";
import sch from "../../assets/school.svg";
import done from "../../assets/done.svg";
import lock from "../../assets/padlock.svg";
import { useNavigate } from "react-router-dom";
import {
  studentService,
  type StudentRecord,
} from "../../services/studentService";

const VerifyStudent = () => {
  const [schoolName, setSchoolName] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [student, setStudent] = useState<StudentRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(
    "Student verification is not configured yet. No student record will be treated as verified.",
  );
  const navigate = useNavigate();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [displayDate, setDisplayDate] = useState("");

  const isFormFilled =
    matricNumber.trim() !== "" &&
    dateOfBirth !== "" &&
    schoolName.trim() !== "";

  const handleVerify = async () => {
    if (!isFormFilled || isLoading) return;
    setIsLoading(true);
    setMessage("");
    setStudent(null);
    try {
      const result = await studentService.verifyStudent({
        schoolName: schoolName.trim(),
        matricNumber: matricNumber.trim(),
        dateOfBirth,
      });

      if (result.status === "not_configured") {
        setMessage(
          "Student verification is not configured yet. No student record was checked or verified.",
        );
      } else if (result.status === "not_found") {
        setMessage("No matching student record was found.");
      } else {
        setStudent(result.student);
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to verify the student record. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (student) {
    const fields = [
      { label: "FULL NAME", value: student.fullName },
      { label: "MATRIC NUMBER", value: student.matricNumber },
      { label: "DEPARTMENT", value: student.department ?? "Not provided" },
      { label: "LEVEL", value: student.level ?? "Not provided" },
      { label: "FACULTY", value: student.faculty ?? "Not provided" },
    ];

    return (
      <>
        <HeaderCurve />
        <div className="flex flex-col p-4 mt-10">
          <div className="flex gap-1.25">
            <h1 className="font-semibold text-[22px] text-[#1E3A8A] leading-[100%]">
              We Found You
            </h1>
            <img src={smile} alt="" className="-mt-1.5" />
          </div>
          <p className="font-medium text-[12px] text-[#817E7E] mt-4 w-full">
            Please confirm these details are correct before continuing
          </p>

          <div className="flex bg-[#D9FFE8] w-full rounded-[10px] py-2.5 px-4 items-center gap-3 mt-6">
            <img src={sch} alt="" className="w-6 h-6 shrink-0" />
            <div className="flex flex-col flex-1 min-w-0 ml-5">
              <p className="font-medium text-black text-[14px] truncate">
                {schoolName}
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
                <h2 className="font-medium text-[14px] text-[#122354]">
                  {field.label}
                </h2>
                <img src={lock} alt="" className="w-4 h-4 mt-0.5" />
              </div>
              <input
                type="text"
                readOnly
                value={field.value}
                className="border rounded-[10px] mt-1.5 py-3.75 px-2.5 h-12 border-[#E9EBF8] bg-[#FCFDFF] text-[12px] font-normal w-full focus:outline-none text-black cursor-not-allowed"
              />
            </div>
          ))}
          <p className="font-medium text-[#888686] text-[10px] mt-3">
            These details came from the configured student record source.
          </p>

          <button
            onClick={() => navigate("/accountsetup")}
            className="flex w-full h-13.5 rounded-[10px] py-3.75 px-2.5 gap-1.25 items-center justify-center mt-6 bg-[#F59E0B]"
          >
            <span className="font-semibold text-[14px] text-[#122354]">
              Yes, This Is Me
            </span>
            <IoArrowForwardOutline className="text-[#122354]" />
          </button>
          <button
            onClick={() => setStudent(null)}
            className="flex w-full h-13.5 rounded-[10px] py-3.75 px-2.5 gap-1.25 items-center justify-center mt-3 bg-[#F0F1FA]"
          >
            <span className="font-semibold text-[14px] text-[#122354]">
              This Is Not Me
            </span>
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderCurve />
      <div className="p-4 mt-10">
        <div className="flex flex-col">
          <h1 className="font-semibold text-[22px] text-[#1E3A8A] leading-[100%]">
            Verify Your Identity
          </h1>
          <p className="font-medium text-[12px] text-[#817E7E] mt-4 max-w-86.75 w-full">
            Enter your matric number and date of birth so we can find your
            school record
          </p>
        </div>

        <p
          className="mt-4 rounded-[10px] border border-[#FBD79B] bg-[#FEF5E7] px-3 py-2 text-[12px] text-[#956007]"
          role="status"
        >
          Student verification is not configured yet. No student record will be
          treated as verified.
        </p>

        <div className="gap-y-2.5">
          <label className="flex flex-col mt-5 gap-y-1.25">
            <span className="font-medium text-[14px] text-[#122354]">
              Matric Number
            </span>
            <input
              type="text"
              autoComplete="off"
              placeholder="Enter your matric number"
              value={matricNumber}
              onChange={(event) => setMatricNumber(event.target.value)}
              className="border rounded-[10px] py-3.75 px-2.5 h-12 border-[#E9EBF8] bg-[#FCFDFF] placeholder:text-[12px] font-normal w-full focus:outline-none text-black focus:border-[#122354]"
            />
          </label>

          <label className="flex flex-col mt-3 gap-y-1.25">
            <span className="font-medium text-[14px] text-[#122354]">
              Date Of Birth
            </span>
            <span className="relative w-full">
              <input
                ref={dateInputRef}
                type="date"
                value={dateOfBirth}
                onChange={(event) => {
                  const raw = event.target.value;
                  setDateOfBirth(raw);
                  if (raw) {
                    const [year, month, day] = raw.split("-");
                    setDisplayDate(`${day} / ${month} / ${year}`);
                  }
                }}
                autoComplete="off"
                style={{
                  opacity: 0,
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  zIndex: 1,
                }}
              />
              <input
                type="text"
                readOnly
                placeholder="DD / MM / YYYY"
                value={displayDate}
                autoComplete="off"
                className="w-full h-12 border border-[#E9EBF8] bg-[#FCFDFF] rounded-[10px] py-3.75 px-2.5 pr-10 text-[12px] placeholder:text-[12px] placeholder:text-[#817E7E] font-normal text-black focus:border-[#122354] focus:outline-none"
              />
              <CiCalendar
                onClick={() => dateInputRef.current?.showPicker()}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#817E7E] text-xl cursor-pointer z-10"
              />
            </span>
          </label>

          <label className="flex flex-col mt-3 gap-y-1.25">
            <span className="font-medium text-[14px] text-[#122354]">
              School
            </span>
            <input
              type="text"
              autoComplete="organization"
              placeholder="Enter your school name"
              value={schoolName}
              onChange={(event) => setSchoolName(event.target.value)}
              className="w-full h-12 border border-[#E9EBF8] bg-[#FCFDFF] rounded-[10px] px-2.5 text-[12px] placeholder:text-[#817E7E] text-black focus:border-[#122354] focus:outline-none"
            />
          </label>
        </div>

        {message && (
          <p className="mt-3 text-[12px] text-[#956007]" role="alert">
            {message}
          </p>
        )}

        <button
          onClick={handleVerify}
          disabled={!isFormFilled || isLoading}
          className={`flex w-full h-12.75 rounded-[10px] py-3.75 px-2.5 gap-1.25 items-center justify-center mt-6 transition-opacity duration-300 disabled:cursor-not-allowed text-white
            ${isFormFilled && !isLoading ? "bg-[#122354] opacity-100" : "bg-[#122354] opacity-40"}`}
        >
          {isLoading ? (
            <span className="flex items-center gap-1.5" role="status">
              <span className="w-2 h-2 rounded-full bg-white dot-1" />
              <span className="w-2 h-2 rounded-full bg-white dot-2" />
              <span className="w-2 h-2 rounded-full bg-white dot-3" />
            </span>
          ) : (
            <>
              <span className="font-semibold text-[14px]">
                Verify My Identity
              </span>
              <IoArrowForwardOutline />
            </>
          )}
        </button>

        <p className="font-medium text-[12px] text-center mt-1.5 text-[#817E7E]">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-blue-500 font-semibold"
          >
            Login
          </button>
        </p>
        <p className="font-medium text-[12px] text-center mt-2 text-[#817E7E]">
          Verification unavailable?{" "}
          <button
            onClick={() => navigate("/accountsetup")}
            className="text-blue-500 font-semibold"
          >
            Create an email account
          </button>
        </p>
      </div>
    </>
  );
};

export default VerifyStudent;
