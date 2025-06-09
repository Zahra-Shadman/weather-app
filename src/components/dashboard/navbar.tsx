import { MdOutlineSettings } from "react-icons/md";
import SelectDemo from "./selectCity";

export default function Navbar() {
  return (
    <div>
      <nav className="bg-[#F3FAFE] h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-lg">
        <div className="flex items-center gap-2 text-[#003464] dark:text-[#A7C6ED]">
          <img src="./logo.svg" alt="logo" />
          <p className="font-roboto">Weather Dashboard</p>
        </div>
        <div className="flex items-center gap-5">
          <SelectDemo />
          <button
            type="button"
            className="w-10 h-10 border-2 border-[#BBC1C4] p-2 rounded-lg flex items-center justify-center text-[#BBC1C4] focus:border-blue-500 focus:bg-blue-100 focus:text-blue-500 transition-colors duration-300"
          >
            <MdOutlineSettings className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </div>
  );
}
