import { MdOutlineMail } from "react-icons/md";

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
        <span className="flex items-center gap-2">
          <img src="./calendar_month.svg" alt="" />
          <span className="flex gap-3">
            <h1>12:25 </h1>.<h1> Monday 23 December 2023</h1>
          </span>
        </span>
      </div>
    </footer>
  );
}
