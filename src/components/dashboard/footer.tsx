import type React from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useLanguage } from "../../utils/loginTranslator";

interface DateTimeDisplayProps {
  isDarkMode: boolean;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ isDarkMode }) => {
  const { language, isRTL } = useLanguage();
  const now = new Date();

  // تنظیمات فرمت برای انگلیسی و فارسی
  const locale = language === "fa" ? "fa-IR" : "en-US";
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = now.toLocaleDateString(locale, options);
  const formattedTime = now.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <span className="flex items-center gap-2" dir={isRTL ? "rtl" : "ltr"}>
      <FaRegCalendarAlt
        className={`w-6 h-4 ${isDarkMode ? "text-white" : "text-[#003464]"}`}
      />
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
  const { language, isRTL } = useLanguage();

  // ترجمه‌های متون فوتر
  const translations = {
    en: {
      copyright: "All rights of this site are reserved for Nadin Sadr Aria Engineering Company.",
      contact: "contact us: info@nadin.ir",
    },
    fa: {
      copyright: "کلیه حقوق این سایت برای شرکت مهندسی نادین صدر آریا محفوظ است.",
      contact: "تماس با ما: info@nadin.ir",
    },
  };

  return (
    <footer
      className={`h-26 w-full min-w-full flex justify-between items-center ${
        isDarkMode
          ? "bg-gradient-to-r from-[#292F45] via-[#3F4861] to-[#151D32]"
          : "bg-gradient-to-r from-[#F3FAFE] via-[#CCDDDD9E] to-[#F3FAFE]"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className={`flex items-center py-8 ${isRTL ? "pr-8" : "pl-8"}`}>
        <img src="./footerLogo.svg" alt="logo" />
        <p
          className={`font-medium text-sm ${
            isDarkMode ? "text-white" : "text-[#003464]"
          } ${isRTL ? "mr-4" : "ml-4"}`}
        >
          {translations[language].copyright}
        </p>
      </div>
      <div
        className={`flex items-center gap-8 ${isRTL ? "pl-8" : "pr-8"} text-sm ${
          isDarkMode ? "text-white" : "text-[#003464]"
        }`}
      >
        <span className="flex items-center gap-2">
          <MdOutlineMail
            className={`w-5 h-[19px] ${isDarkMode ? "text-white" : "text-[#003464]"}`}
          />
          <h1>{translations[language].contact}</h1>
        </span>
        <DateTimeDisplay isDarkMode={isDarkMode} />
      </div>
    </footer>
  );
};

export default Footer;