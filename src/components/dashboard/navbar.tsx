import { MdOutlineSettings } from "react-icons/md";
import SelectCity from "./selectCity";
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MdLightMode, MdDarkMode, MdExitToApp } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  city: string;
  setCity: (city: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ city, setCity }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModeChange = (mode: "light" | "dark") => {
    console.log(`Mode changed to: ${mode}`);
    handleClose();
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
      <nav className="bg-[#F3FAFE] h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-lg">
        <div className="flex items-center gap-2 text-[#003464] dark:text-[#A7C6ED]">
          <img src="./logo.svg" alt="logo" />
          <p className="font-roboto">Weather Dashboard</p>
        </div>
        <div className="flex items-center gap-5">
          <SelectCity city={city} setCity={setCity} />
          <button
            name="setting"
            type="button"
            className="w-10 h-10 border-2 border-[#BBC1C4] p-2 rounded-lg flex items-center justify-center text-[#BBC1C4] focus:border-blue-500 focus:bg-blue-100 focus:text-blue-500 transition-colors duration-300"
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
        <div className="px-3 py-2  font-medium  border-gray-200">Mode</div>
        <div className="flex flex-row items-center justify-center border-2 border-gray-300 rounded-md">
          <MenuItem
            onClick={() => handleModeChange("light")}
            className="flex items-center gap-3 py-2 flex-1 min-w-auto"
          >
            <MdLightMode className="text-blue-500" />
            Light
          </MenuItem>
          <div className="w-px h-10 bg-gray-300 flex-shrink-0"></div>
          <MenuItem
            onClick={() => handleModeChange("dark")}
            className="flex items-center gap-3 py-2 flex-1 min-w-auto"
          >
            <MdDarkMode className="text-gray-600" />
            Dark
          </MenuItem>
        </div>
        {/* Language Section */}
        <div className="px-3 py-2 text-sm font-medium border-gray-200 mt-2">
          Language
        </div>
        <div className="flex flex-row  items-center justify-center border-2 border-gray-300 rounded-md">
          <MenuItem
            onClick={() => handleModeChange("light")}
            className="flex items-center gap-3  py-2 flex-1 min-w-auto"
          >
            EN
          </MenuItem>
          <div className="w-px h-10 bg-gray-300 flex-shrink-0"></div>
          <MenuItem
            onClick={() => handleModeChange("dark")}
            className="flex items-center  gap-3 py-2 flex-1 min-w-auto"
          >
            Fa
          </MenuItem>
        </div>
        {/* Exit Section */}
        <div className="border-t border-gray-200 mt-2 pt-2">
          <MenuItem
            onClick={handleExit}
            className="flex items-center gap-3 py-2 text-red-600"
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
