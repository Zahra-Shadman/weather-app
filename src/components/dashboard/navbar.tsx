import { MdOutlineSettings } from "react-icons/md";
import SelectCity from "./selectCity";
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MdExitToApp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonSharp } from "react-icons/io5";

interface NavbarProps {
  city: string;
  setCity: (city: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const SunIcon = () => <IoSunnyOutline className="text-[#8895A0]" />;
const MoonIcon = () => <IoMoonSharp className="text-[#8895A0]" />;

const Navbar: React.FC<NavbarProps> = ({ city, setCity, isDarkMode, toggleTheme }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: "en" | "fa") => {
    console.log(`Language changed to: ${language}`);
    handleClose();
  };

  const handleExit = () => {
    navigate("/");
    console.log("Exit clicked");
    handleClose();
  };

  return (
    <div>
      <nav className={`h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-md ${
                isDarkMode ? "bg-[#292F45]" : "bg-[#F3FAFE]"
              }`}>
        <div className="flex items-center gap-2 text-[#003464] dark:text-[#A7C6ED]">
          <img src="./logo.svg" alt="logo" />
          <p className={`font-normal text-[12px] font-roboto ${  isDarkMode ? "text-[#F3F4F7]" : "text-[#003464]"}`}>Weather Dashboard</p>
        </div>
        <div className="flex items-center gap-5">
          <SelectCity city={city} setCity={setCity} />
          <button
            name="setting"
            type="button"
            className="w-10 h-10 border-2 border-[#BBC1C4] p-2 rounded-lg flex items-center justify-center text-[#BBC1C4]  focus:text-blue-500 transition-colors duration-300"
            onClick={handleSettingsClick}
            aria-controls={open ? "settings-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MdOutlineSettings className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              width: "200px",
              padding: "8px",
            },
          },
        }}
      >
        {/* Mode Section */}
        <div className="px-3 py-2 font-medium border-gray-200 dark:text-[#F3F4F7]">Mode</div>
        <div className="flex flex-row items-center justify-center border-2 border-gray-300 dark:border-gray-600 rounded-md">
          <MenuItem
            onClick={toggleTheme}
            className={`flex items-center gap-3 py-2 flex-1 min-w-auto ${!isDarkMode ? "bg-blue-100 text-blue-500" : ""}`}
          >
            <SunIcon />
            <span className="text-[#8895A0] hover:text-gray-700">Light</span>
          </MenuItem>
          <div className="w-px h-10 bg-gray-300 dark:bg-gray-600 flex-shrink-0"></div>
          <MenuItem
            onClick={toggleTheme}
            className={`flex items-center gap-3 py-2 flex-1 min-w-auto ${isDarkMode ? "bg-gray-600 text-gray-200" : ""}`}
          >
            <MoonIcon />
            <span className="text-[#8895A0] hover:text-gray-700">Dark</span>
          </MenuItem>
        </div>
        {/* Language Section */}
        <div className="px-3 py-2 text-sm font-medium border-gray-200 mt-2 dark:text-[#F3F4F7]">
          Language
        </div>
        <div className="flex flex-row items-center justify-center border-2 border-gray-300 dark:border-gray-600 rounded-md">
          <MenuItem
            onClick={() => handleLanguageChange("en")}
            className="flex items-center gap-3 py-2 flex-1 min-w-auto"
          >
            EN
          </MenuItem>
          <div className="w-px h-10 bg-gray-300 dark:bg-gray-600 flex-shrink-0"></div>
          <MenuItem
            onClick={() => handleLanguageChange("fa")}
            className="flex items-center gap-3 py-2 flex-1 min-w-auto"
          >
            Fa
          </MenuItem>
        </div>
        {/* Exit Section */}
        <div className="border-t border-gray-200 dark:border-gray-600 mt-2 pt-2">
          <MenuItem
            onClick={handleExit}
            className="flex items-center gap-3 py-2 text-red-600 dark:text-red-400"
          >
            <MdExitToApp />
            Exit
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
};

export default Navbar;