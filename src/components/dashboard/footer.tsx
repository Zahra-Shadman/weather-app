import type React from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

interface DateTimeDisplayProps {
  isDarkMode: boolean;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ isDarkMode }) => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = now.toLocaleDateString("en-US", options);
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <span className="flex items-center gap-2">
     <FaRegCalendarAlt  className={`w-6 h-4 ${
            isDarkMode ? "text-white" : "text-[#003464]"
          }`} />

      <span className="flex gap-3">
        <h1 className={isDarkMode ? "text-white" : "text-[#003464]"}>{formattedTime}</h1>.
        <h1 className={isDarkMode ? "text-white" : "text-[#003464]"}>{formattedDate}</h1>
      </span>
    </span>
  );
};

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer
      className={` h-26 w-full min-w-full flex justify-between items-center ${
        isDarkMode ? "bg-gradient-to-r from-[#292F45] via-[#3F4861] to-[#151D32]" : "bg-gradient-to-r from-[#F3FAFE] via-[#CCDDDD9E] to-[#F3FAFE]"
      }`}
    >
      <div className="flex items-center py-8">
        <img src="./footerLogo.svg" alt="logo" />
        <p
          className={`font-medium text-sm ${
            isDarkMode ? "text-white" : "text-[#003464]"
          }`}
        >
          All rights of this site are reserved for Nadin Sadr Aria Engineering
          Company.
        </p>
      </div>
      <div
        className={`flex items-center gap-8 pr-8 text-sm ${
          isDarkMode ? "text-white" : "text-[#003464]"
        }`}
      >
        <span className="flex items-center gap-2">
          <MdOutlineMail   className={`w-5 h-[19px] ${
          isDarkMode ? "text-white" : "text-[#003464]"
        }`} />
          <h1>contact us : info@nadin.ir</h1>
        </span>
        <DateTimeDisplay isDarkMode={isDarkMode} />
      </div>
    </footer>
  );
};

export default Footer;