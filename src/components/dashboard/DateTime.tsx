interface DateTimeDisplayProps {
  isDarkMode: boolean;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ isDarkMode }) => {
  const now = new Date();
  const weekdayOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const weekday = now.toLocaleDateString("en-US", weekdayOptions);
  const formattedDate = now.toLocaleDateString("en-US", dateOptions);
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="flex flex-col w-full py-4">
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