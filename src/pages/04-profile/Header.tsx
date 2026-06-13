import { useRef, useState } from "react";
import avatar from "../../assets/subtract.svg";
import { MdEdit } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
import uload from "../../assets/uload.svg";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import pht from "../../assets/take photo.svg";
import ava from "../../assets/avarter.svg";
import pers from "../../assets/pers.svg";
import notif from "../../assets/notif.svg";
import history from "../../assets/payment history.svg";
import method from "../../assets/method.svg";
import privacy from "../../assets/privacy.svg";
import { BiSolidPencil } from "react-icons/bi";
import { IoMdLock } from "react-icons/io";
import warning from "../../assets/warning 2.svg";
import { MdCheck } from "react-icons/md";
import {
  IoSearchOutline,
  IoCallOutline,
  IoMailOutline,
  IoChatbubblesOutline,
} from "react-icons/io5";

const Header = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [showChooseAvatar, setShowChooseAvatar] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [showHelpSupport, setShowHelpSupport] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [personalDetails, setPersonalDetails] = useState(() => {
    const saved = localStorage.getItem("personalDetails");
    return saved
      ? JSON.parse(saved)
      : {
          fullName: "Odafe Samuel",
          email: "Odafesamuel@gmail.com",
          phone: "+234 702 345 4564",
          gender: "Male",
          dob: "September 13, 2005",
          address: "14 Ondo Street, Lagos",
          contactName: "Mr Odafe John",
          relationship: "Father",
          contactPhone: "+234 702 345 4564",
          contactGender: "Male",
        };
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("personalDetails", JSON.stringify(personalDetails));
    setIsEditing(false);
  };

  const settings = [
    {
      title: "Personal Information",
      subtitle: "Update your details",
      icon: pers,
      type: "link",
    },
    {
      title: "Notifications",
      subtitle: "Payment reminders & alerts",
      icon: notif,
      type: "toggle",
    },
    {
      title: "Saved payment mode",
      subtitle: "Card & bank accounts",
      icon: method,
      type: "link",
    },
    {
      title: "Payment history",
      subtitle: "View all payment history",
      icon: history,
      type: "link",
    },
    {
      title: "Security & Privacy",
      subtitle: "View all payment history",
      icon: privacy,
      type: "link",
    },
    {
      title: "Help & Support",
      subtitle: "Get assistance",
      icon: pers,
      type: "link",
    },
  ];

  const personalInfo = [
    {
      icon: <IoMdLock className="text-[#F59E0B]" />,
      label: "Matric Number",
      value: "19/112/0045",
      editable: false,
    },
    {
      icon: <IoMdLock className="text-[#F59E0B]" />,
      label: "Department",
      value: "Nutrition & Dietetics",
      editable: false,
    },
    {
      icon: <IoMdLock className="text-[#F59E0B]" />,
      label: "Faculty",
      value: "Health Science",
      editable: false,
    },
    {
      icon: <IoMdLock className="text-[#F59E0B]" />,
      label: "Level",
      value: "300 Level",
      editable: false,
    },
    {
      icon: <IoMdLock className="text-[#F59E0B]" />,
      label: "Session",
      value: "300 Level",
      editable: false,
    },
  ];

  if (showHelpSupport) {
    return (
      <div className="px-6 mt-10 pb-30">
        {/* HEADER */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => setShowHelpSupport(false)}
            className="shrink-0"
          >
            <IoArrowBackOutline className="text-white bg-[#122354] w-7 h-7 rounded-[7px] p-1" />
          </button>
          <p className="font-semibold text-[16px] text-[#1E3A8A]">
            Help & Support
          </p>
          <div className="w-7" />
        </div>

        <p className="text-center text-[#726F6F] text-[14px] font-medium mt-4">
          We're here to support you
        </p>

        {/* HERO CARD */}
        <div className="w-full bg-[#122354] rounded-xl px-4 py-6 flex flex-col items-center text-center mt-4">
          <span className="text-2xl mb-2">🎓</span>
          <p className="font-semibold text-[14px] text-white">
            How can we help you?
          </p>
          <p className="font-medium text-[10px] text-[#FFFFFF]/70 mt-1 px-10">
            Find answers to common questions or reach out to our support team
            directly
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Search for help..."
            className="w-full border border-[#E9EBF8] bg-[#FCFDFF] rounded-[10px] py-3 pl-10 pr-4 text-[13px] placeholder:text-[#817E7E] focus:outline-none focus:border-[#122354]"
          />
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-[#817E7E] text-lg" />
        </div>

        {/* FAQ */}
        <p className="font-semibold text-[14px] text-[#122354] mt-5 mb-3">
          Frequently Asked Questions
        </p>

        <div className="flex flex-col gap-2">
          {[
            "Why is my payment failing?",
            "How do I pay my fees?",
            "Can I pay in installments?",
            "How do I update my account",
          ].map((question, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-4 py-3.5 h-[57px] rounded-[10px] border border-[#122354] bg-[#FCFDFF] ${i === 0 ? "border-[#122354]" : ""}`}
            >
              <p className="font-medium text-[14px] text-[#122354]">{question}</p>
              <MdOutlineKeyboardArrowRight className="text-[#817E7E] text-xl shrink-0" />
            </div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <p className="font-semibold text-[14px] text-black mt-6 mb-3">
          Quick Actions
        </p>

        <div className="border border-[#E9EBF8] rounded-xl bg-white overflow-hidden">
          {/* Live Chat */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E9EBF8]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
                <IoChatbubblesOutline className="text-[#1E3A8A] text-lg" />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-[13px] text-black">
                  Live Chat
                </p>
                <p className="font-normal text-[11px] text-[#817E7E]">
                  Average response: 2mins
                </p>
              </div>
            </div>
            <button className="bg-[#122354] text-white text-[12px] font-medium px-4 py-1.5 rounded-lg">
              Chat
            </button>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E9EBF8]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#ECFDF5] flex items-center justify-center shrink-0">
                <IoCallOutline className="text-[#108B41] text-lg" />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-[13px] text-black">
                  +234 444 873 3837
                </p>
                <p className="font-normal text-[11px] text-[#817E7E]">
                  Mon-Fri, 8am-5pm
                </p>
              </div>
            </div>
            <button className="bg-[#108B41] text-white text-[12px] font-medium px-4 py-1.5 rounded-lg">
              Call
            </button>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FFF7ED] flex items-center justify-center shrink-0">
                <IoMailOutline className="text-[#F59E0B] text-lg" />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-[13px] text-black">
                  support@edu.com
                </p>
                <p className="font-normal text-[11px] text-[#817E7E]">
                  Reply within 24 hours
                </p>
              </div>
            </div>
            <button className="bg-[#F59E0B] text-white text-[12px] font-medium px-4 py-1.5 rounded-lg">
              Email
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showPersonalInfo) {
    return (
      <div className="px-6 mt-10 pb-45">
        {/* HEADER */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => setShowPersonalInfo(false)}
            className="shrink-0"
          >
            <IoArrowBackOutline className="text-white bg-[#122354] w-7 h-7 rounded-[7px] p-1" />
          </button>
          <p className="font-semibold text-[16px] text-[#1E3A8A]">
            Personal Info
          </p>
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="flex shrink-0 rounded-[10px] h-7 py-1.25 px-2 bg-[#122354] gap-1 text-white items-center"
          >
            {isEditing ? (
              <>
                <MdCheck className="text-sm" />
                <p className="font-medium text-[12px] text-white">Save</p>
              </>
            ) : (
              <>
                <BiSolidPencil className="text-sm" />
                <p className="font-medium text-[12px] text-white">Edit</p>
              </>
            )}
          </button>
        </div>

        {/* ACADEMIC INFORMATION */}
        <div className="flex items-center gap-3 mt-5">
          <p className="text-[#1E3A8A] text-[14px] font-semibold whitespace-nowrap">
            Academic Information
          </p>
          <div className="flex-1 h-[0.5px] bg-[#848181]" />
        </div>

        <div className="flex flex-col mt-2.5 border-[0.5px] border-[#8C8B8B] w-full rounded-[10px] p-3.75 gap-2.5">
          {personalInfo.map((item, index) => (
            <div key={index}>
              <div className="flex gap-1.25 items-start">
                <div className="mt-1">{item.icon}</div>
                <div className="flex flex-col">
                  <p className="font-semibold text-[12px] text-[#817E7E] mt-1">
                    {item.label}
                  </p>
                  <p className="font-semibold text-[#1E3A8A] text-[14px] -ml-4.5 mt-1.5">
                    {item.value}
                  </p>
                </div>
                {!item.editable ? (
                  <button className="border bg-[#F5F5F5] border-[#919190] rounded-[10px] ml-auto font-medium text-[10px] text-[#6F6E6C] py-1.25 px-2.5 h-6.25 items-center text-center justify-center">
                    Cannot edit
                  </button>
                ) : (
                  <button className="border bg-[#EEF2FF] border-[#1E3A8A] rounded-[10px] ml-auto font-medium text-[10px] text-[#1E3A8A] py-1.25 px-2.5 h-6.25 items-center text-center justify-center">
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* WARNING */}
        <div className="border-[#FBD79B] w-full rounded-[5px] border p-3 bg-[#FEF5E7] flex items-start mt-4">
          <img
            src={warning}
            alt=""
            className="w-[38.81px] h-[34.5px] shrink-0"
          />
          <div className="flex flex-col ml-2 mt-0.5">
            <p className="font-semibold text-[10px] text-[#956007] leading-tight">
              Academic details are managed by your school
            </p>
            <p className="font-normal text-[10px] text-[#726F6F] mt-1.5 leading-tight">
              Contact the admin officer if any info is incorrect
            </p>
          </div>
        </div>

        {/* PERSONAL DETAILS */}
        <div className="flex items-center gap-3 mt-6.5">
          <p className="text-[#1E3A8A] text-[14px] font-semibold whitespace-nowrap">
            Personal Details
          </p>
          <div className="flex-1 h-[0.5px] bg-[#848181]" />
        </div>

        <div className="border border-[#E9EBF8] rounded-[10px] px-4 py-4 flex flex-col gap-4 bg-white mt-3">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[12px] text-[#817E7E]">
              Full Name
            </p>
            {isEditing ? (
              <input
                value={personalDetails.fullName}
                onChange={(e) =>
                  setPersonalDetails((prev: typeof personalDetails) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
                className="font-semibold text-[14px] text-[#1E3A8A] border border-[#E9EBF8] bg-[#FCFDFF] rounded-lg px-3 py-2 focus:outline-none w-full"
              />
            ) : (
              <p className="font-semibold text-[14px] text-[#1E3A8A]">
                {personalDetails.fullName}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[12px] text-[#817E7E]">
              Email Address
            </p>
            {isEditing ? (
              <input
                value={personalDetails.email}
                onChange={(e) =>
                  setPersonalDetails((prev: typeof personalDetails) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="font-semibold text-[14px] text-[#1E3A8A] border border-[#E9EBF8] bg-[#FCFDFF] rounded-lg px-3 py-2 focus:outline-none w-full"
              />
            ) : (
              <p className="font-semibold text-[14px] text-[#1E3A8A]">
                {personalDetails.email}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[12px] text-[#817E7E]">
              Phone Number
            </p>
            {isEditing ? (
              <input
                value={personalDetails.phone}
                onChange={(e) =>
                  setPersonalDetails((prev: typeof personalDetails) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                className="font-semibold text-[14px] text-[#1E3A8A] border border-[#E9EBF8] bg-[#FCFDFF] rounded-lg px-3 py-2 focus:outline-none w-full"
              />
            ) : (
              <p className="font-semibold text-[14px] text-[#1E3A8A]">
                {personalDetails.phone}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[12px] text-[#817E7E]">Gender</p>
            {isEditing ? (
              <input
                value={personalDetails.gender}
                onChange={(e) =>
                  setPersonalDetails((prev: typeof personalDetails) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
                className="font-semibold text-[14px] text-[#1E3A8A] border border-[#E9EBF8] bg-[#FCFDFF] rounded-lg px-3 py-2 focus:outline-none w-full"
              />
            ) : (
              <p className="font-semibold text-[14px] text-[#1E3A8A]">
                {personalDetails.gender}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[12px] text-[#817E7E]">
              Date of Birth
            </p>
            {isEditing ? (
              <input
                value={personalDetails.dob}
                onChange={(e) =>
                  setPersonalDetails((prev: typeof personalDetails) => ({
                    ...prev,
                    dob: e.target.value,
                  }))
                }
                className="font-semibold text-[14px] text-[#1E3A8A] border border-[#E9EBF8] bg-[#FCFDFF] rounded-lg px-3 py-2 focus:outline-none w-full"
              />
            ) : (
              <p className="font-semibold text-[14px] text-[#1E3A8A]">
                {personalDetails.dob}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[12px] text-[#817E7E]">Address</p>
            {isEditing ? (
              <input
                value={personalDetails.address}
                onChange={(e) =>
                  setPersonalDetails((prev: typeof personalDetails) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                className="font-semibold text-[14px] text-[#1E3A8A] border border-[#E9EBF8] bg-[#FCFDFF] rounded-lg px-3 py-2 focus:outline-none w-full"
              />
            ) : (
              <p className="font-semibold text-[14px] text-[#1E3A8A]">
                {personalDetails.address}
              </p>
            )}
          </div>
        </div>

        {/* EMERGENCY CONTACT */}
        <div className="flex items-center gap-3 mt-4">
          <p className="text-[#1E3A8A] text-[14px] font-semibold whitespace-nowrap">
            Emergency Contact
          </p>
          <div className="flex-1 h-[0.5px] bg-[#848181]" />
        </div>

        <div className="border border-[#E9EBF8] rounded-[10px] p-3.75 flex flex-col gap-2.5 bg-white mt-3">
          {/* Contact Name */}
          <div className="flex flex-col gap-1 mt-1.5">
            <p className="font-semibold text-[12px] text-[#817E7E]">
              Contact Name
            </p>
            {isEditing ? (
              <input
                value={personalDetails.contactName}
                onChange={(e) =>
                  setPersonalDetails((prev: typeof personalDetails) => ({
                    ...prev,
                    contactName: e.target.value,
                  }))
                }
                className="font-semibold text-[14px] text-[#1E3A8A] border border-[#E9EBF8] bg-[#FCFDFF] rounded-lg px-3 py-2 focus:outline-none w-full"
              />
            ) : (
              <p className="font-semibold text-[14px] text-[#1E3A8A]">
                {personalDetails.contactName}
              </p>
            )}
          </div>

          {/* Relationship */}
          <div className="flex flex-col gap-1 mt-1.5">
            <p className="font-semibold text-[12px] text-[#817E7E]">
              Relationship
            </p>
            {isEditing ? (
              <input
                value={personalDetails.relationship}
                onChange={(e) =>
                  setPersonalDetails((prev: typeof personalDetails) => ({
                    ...prev,
                    relationship: e.target.value,
                  }))
                }
                className="font-semibold text-[14px] text-[#1E3A8A] border border-[#E9EBF8] bg-[#FCFDFF] rounded-lg px-3 py-2 focus:outline-none w-full"
              />
            ) : (
              <p className="font-semibold text-[14px] text-[#1E3A8A]">
                {personalDetails.relationship}
              </p>
            )}
          </div>

          {/* Contact Phone */}
          <div className="flex flex-col gap-1 mt-1.5">
            <p className="font-semibold text-[12px] text-[#817E7E]">
              Phone Number
            </p>
            {isEditing ? (
              <input
                value={personalDetails.contactPhone}
                onChange={(e) =>
                  setPersonalDetails((prev: typeof personalDetails) => ({
                    ...prev,
                    contactPhone: e.target.value,
                  }))
                }
                className="font-semibold text-[14px] text-[#1E3A8A] border border-[#E9EBF8] bg-[#FCFDFF] rounded-lg px-3 py-2 focus:outline-none w-full"
              />
            ) : (
              <p className="font-semibold text-[14px] text-[#1E3A8A]">
                {personalDetails.contactPhone}
              </p>
            )}
          </div>

          {/* Contact Gender */}
          <div className="flex flex-col gap-1 mt-1.5">
            <p className="font-semibold text-[12px] text-[#817E7E]">Gender</p>
            {isEditing ? (
              <input
                value={personalDetails.contactGender}
                onChange={(e) =>
                  setPersonalDetails((prev: typeof personalDetails) => ({
                    ...prev,
                    contactGender: e.target.value,
                  }))
                }
                className="font-semibold text-[14px] text-[#1E3A8A] border border-[#E9EBF8] bg-[#FCFDFF] rounded-lg px-3 py-2 focus:outline-none w-full"
              />
            ) : (
              <p className="font-semibold text-[14px] text-[#1E3A8A]">
                {personalDetails.contactGender}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (showEditProfile) {
    return (
      <div className="px-6 mt-10">
        <div className="flex gap-20.75">
          <button onClick={() => setShowEditProfile(false)}>
            <IoArrowBackOutline className="text-white bg-[#122354] w-7 h-7 rounded-[7px] p-1" />
          </button>
          <p className="font-semibold text-[16px] text-black mt-1.5">
            Edit Profile Photo
          </p>
        </div>

        {/* hidden inputs — no layout impact */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleImageChange}
        />

        {/* CIRCLE */}
        <div className="flex justify-center mt-16">
          <div className="w-24 h-24 rounded-full border-[3px] bg-[#8C8888] border-[#828181] flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                width="96"
                height="96"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  opacity="0.3"
                  cx="50"
                  cy="50"
                  r="48.5"
                  fill="#828181"
                  stroke="#8C8888"
                  strokeWidth="3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M41.3333 39.2917C41.3333 37.1257 42.1937 35.0485 43.7253 33.517C45.2568 31.9854 47.3341 31.125 49.5 31.125C51.6659 31.125 53.7432 31.9854 55.2747 33.517C56.8063 35.0485 57.6667 37.1257 57.6667 39.2917C57.6667 41.4576 56.8063 43.5348 55.2747 45.0664C53.7432 46.5979 51.6659 47.4583 49.5 47.4583C47.3341 47.4583 45.2568 46.5979 43.7253 45.0664C42.1937 43.5348 41.3333 41.4576 41.3333 39.2917ZM41.3333 51.5417C38.6259 51.5417 36.0294 52.6172 34.115 54.5316C32.2005 56.4461 31.125 59.0426 31.125 61.75C31.125 63.3745 31.7703 64.9324 32.919 66.081C34.0676 67.2297 35.6255 67.875 37.25 67.875H61.75C63.3745 67.875 64.9324 67.2297 66.081 66.081C67.2297 64.9324 67.875 63.3745 67.875 61.75C67.875 59.0426 66.7995 56.4461 64.885 54.5316C62.9706 52.6172 60.3741 51.5417 57.6667 51.5417H41.3333Z"
                  fill="#313030"
                />
              </svg>
            )}
          </div>
        </div>

        {/* OPTIONS */}
        <div className="flex flex-col ml-2 mt-16 gap-2.25">
          {/* Upload from Library */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex gap-1.25 w-full rounded-[10px] p-2.5 bg-[#FCFDFF] items-center justify-center"
          >
            <img src={uload} alt="" className="w-[40.79px] h-9.25" />
            <p className="font-medium text-black text-[14px] mt-1.5">
              Upload From Library
            </p>
            <MdOutlineKeyboardArrowRight className="ml-auto mt-2" />
          </button>

          {/* Take a Photo */}
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="flex gap-1.25 w-full rounded-[10px] p-2.5 bg-[#FCFDFF] items-center justify-center"
          >
            <img src={pht} alt="" className="w-[40.79px] h-9.25" />
            <p className="font-medium text-black text-[14px] mt-1.5">
              Take a Photo
            </p>
            <MdOutlineKeyboardArrowRight className="ml-auto mt-2" />
          </button>

          {/* Choose Avatar */}
          <button
            onClick={() => setShowChooseAvatar(true)}
            className="flex gap-1.25 w-full rounded-[10px] p-2.5 bg-[#FCFDFF] items-center justify-center"
          >
            <img src={ava} alt="" className="w-[40.79px] h-9.25" />
            <p className="font-medium text-black text-[14px] mt-1.5">
              Chose Your Avatar
            </p>
            <MdOutlineKeyboardArrowRight className="ml-auto mt-2" />
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="pb-32">
        <div className="relative h-25 w-full overflow-hidden bg-[#122354]">
          <div className="flex items-center justify-center pt-15">
            <h1 className="text-white text-[20px] font-semibold">Profile</h1>
          </div>
        </div>

        <div className="px-6 mt-8">
          <div className="relative flex items-start gap-4">
            {/* Avatar */}
            <div className="relative w-20 h-20 shrink-0">
              <img
                src={avatar}
                alt="profile"
                className="w-full h-full rounded-[12.75px] object-cover"
              />
              <button
                onClick={() => setShowEditProfile(true)}
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#1E3A8A] flex items-center justify-center border-2 border-white"
              >
                <MdEdit className="text-white text-sm" />
              </button>
            </div>

            {/* Name, matric, verified */}
            <div className="flex flex-col justify-center gap-1 pt-1">
              <h1 className="font-semibold text-[18px] text-black">
                Odafe Samuel
              </h1>
              <p className="font-normal text-[13px] text-[#726F6F]">
                Matric No: 19/112/0043
              </p>
              <button className="flex items-center gap-1 border border-[#108B41] rounded-full px-3 py-0.5 w-fit mt-1">
                <span className="text-[#108B41] text-[11px]">✓</span>
                <span className="text-[#108B41] font-medium text-[11px]">
                  Verified Student
                </span>
              </button>
            </div>
          </div>

          <div className="flex bg-[#122354] w-full py-7.5 px-5 gap-5.5 rounded-[10px] h-26.25 mt-6 justify-between">
            <div className="flex flex-col gap-0.75 items-center text-center">
              <p className="font-semibold text-white text-[16px]">₦10000.00</p>
              <p className="font-normal text-[#9C9A9A] text-[12px]">
                Total Paid
              </p>
            </div>

            <div className="flex flex-col gap-0.75 items-center text-center">
              <p className="font-semibold text-white text-[16px]">6</p>
              <p className="font-normal text-[#9C9A9A] text-[12px]">Pending</p>
            </div>

            <div className="flex flex-col gap-0.75 items-center text-center">
              <p className="font-semibold text-white text-[16px]">12</p>
              <p className="font-normal text-[#9C9A9A] text-[12px]">
                Transactions
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {settings.map((item, index) => (
              <div
                key={index}
                onClick={
                  index === 0
                    ? () => setShowPersonalInfo(true)
                    : index === settings.length - 1
                      ? () => setShowHelpSupport(true)
                      : undefined
                }
                className={`flex gap-1.25 w-full rounded-[10px] p-2.5 bg-[#FCFDFF] items-center ${
                  index === 0 || index === settings.length - 1
                    ? "cursor-pointer"
                    : ""
                }`}
              >
                <img src={item.icon} alt="" className="w-[40.79px] h-9.25" />

                <div className="flex flex-col">
                  <p className="font-medium text-[14px] text-black">
                    {item.title}
                  </p>
                  <p className="font-normal text-[#817E7E] text-[12px]">
                    {item.subtitle}
                  </p>
                </div>

                {item.type === "toggle" ? (
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`ml-auto relative w-11 h-6 rounded-full transition-all ${
                      notifications ? "bg-[#122354]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                        notifications ? "left-5.5" : "left-0.5"
                      }`}
                    />
                  </button>
                ) : (
                  <MdOutlineKeyboardArrowRight className="ml-auto text-xl" />
                )}
              </div>
            ))}

            <button className="w-full bg-red-600 py-4 rounded-[10px] text-white">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
