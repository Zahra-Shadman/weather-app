import { MdOutlineMail } from "react-icons/md";
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
    <span className="flex items-center gap-2">
      <img src="./calendar_month.svg" alt="" />
      <span className="flex gap-3">
        <h1>{formattedTime}</h1>.<h1>{formattedDate}</h1>
      </span>
    </span>
  );
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#F3FAFE] via-[#CCDDDD9E] to-[#F3FAFE] h-26 w-full min-w-full flex justify-between items-center">
      <div className="flex items-center py-8">
        <img src="./footerLogo.svg" alt="logo" />
        <p className="text-[#003464] font-medium  text-sm">
          All rights of this site are reserved for Nadin Sadr Aria Engineering
          Company.
        </p>
      </div>
      <div className="flex items-center gap-8 pr-8 text-sm text-[#003464]">
        <span className="flex items-center gap-2">
          <MdOutlineMail className="w-5 h-[19px]" />
          <h1>contact us : info@nadin.ir</h1>
        </span>
        <DateTimeDisplay />
      </div>
    </footer>
  );
}