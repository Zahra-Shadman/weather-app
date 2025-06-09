const DateTimeDisplay = () => {
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
    <div className="flex flex-col w-full py-4">
      <h1 className="text-3xl text-[#003464]">{formattedDate.split(",")[0]}</h1>
      <span className="flex gap-5 text-sm font-roboto text-[#003464] py-1 ">
        {formattedDate} <span>{formattedTime}</span>
      </span>
    </div>
  );
};

export default DateTimeDisplay;
