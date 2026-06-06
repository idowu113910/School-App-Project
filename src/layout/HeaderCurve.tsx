const HeaderCurve = () => {
  return (
    <div className="w-full relative" style={{ height: "183px" }}>
      <svg
        width="100%"
        height="183"
        viewBox="0 0 390 183"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <path
          d="M0 0H390V120C390 120 406.5 133.5 374.5 133.5C342.5 133.5 344 139 307 145.5C270 152 246 177 210.5 165C175 153 118 197 86.5 178C55 159 0 178 0 178V0Z"
          fill="url(#paint0_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="195"
            y1="0"
            x2="195"
            y2="184.329"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1E3A8A" />
            <stop offset="0.491087" stopColor="#152961" />
            <stop offset="1" stopColor="#122354" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default HeaderCurve;
