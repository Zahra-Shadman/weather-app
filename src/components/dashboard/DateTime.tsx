import React from "react";
import { useLanguage } from "../../utils/loginTranslator";

interface DateTimeDisplayProps {
  isDarkMode: boolean;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ isDarkMode }) => {
  const { language, isRTL } = useLanguage();
  const now = new Date();

  const locale = language === "fa" ? "fa-IR" : "en-US";

  const weekdayOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const weekday = now.toLocaleDateString(locale, weekdayOptions);
  const formattedDate = now.toLocaleDateString(locale, dateOptions);
  const formattedTime = now.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="flex flex-col w-full py-4" dir={isRTL ? "rtl" : "ltr"}>
      <h1
        className={`text-[32px] font-roboto font-medium ${
          isDarkMode ? "text-[#F3F4F7]" : "text-[#003464]"
        }`}
      >
        {weekday}
      </h1>
      <span
        className={`flex gap-5 text-sm font-roboto font-normal py-1 ${
          isDarkMode ? "text-[#F3F4F7]" : "text-[#003464]"
        }`}
      >
        {formattedDate} <span>{formattedTime}</span>
      </span>
    </div>
  );
};

export default DateTimeDisplay;