import { MdOutlineSettings, MdExitToApp } from "react-icons/md";
import { IoSunnyOutline, IoMoonSharp } from "react-icons/io5";
import SelectCity from "./selectCity";
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useLanguage } from "../../utils/loginTranslator";

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
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { language, setLanguage, translations, isRTL } = useLanguage();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // موبایل بودن

  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isMobile) {
      setMobileDrawerOpen(true);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileDrawerOpen(false);
  };

  const handleLanguageChange = (newLanguage: "en" | "fa") => {
    setLanguage(newLanguage);
    console.log(`Language changed to: ${newLanguage}`);
    handleClose();
  };

  const handleExit = () => {
    navigate("/");
    console.log("Exit clicked");
    handleClose();
  };

  const navbarTranslations = {
    en: {
      weatherDashboard: "Weather Dashboard",
      mode: "Mode",
      light: "Light",
      dark: "Dark",
      language: "Language",
      exit: "Exit",
    },
    fa: {
      weatherDashboard: "داشبورد آب و هوا",
      mode: "حالت",
      light: "روشن",
      dark: "تاریک",
      language: "زبان",
      exit: "خروج",
    },
  };

  const navTranslations = navbarTranslations[language];

  const SettingsContent = (
    <div className="p-4 w-64 overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Mode Section */}
      <div className={`font-medium mb-1 ${isRTL ? "text-right" : "text-left"}`}>
        {navTranslations.mode}
      </div>
      <div className="flex flex-row items-center justify-center border border-gray-300 dark:border-gray-600 rounded-md mb-3">
        <MenuItem
          onClick={toggleTheme}
          className={`flex items-center gap-3 py-2 flex-1 ${
            !isDarkMode ? "bg-blue-100 text-blue-500" : ""
          } ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <SunIcon />
          <span>{navTranslations.light}</span>
        </MenuItem>
        <div className="w-px h-10 bg-gray-300 dark:bg-gray-600"></div>
        <MenuItem
          onClick={toggleTheme}
          className={`flex items-center gap-3 py-2 flex-1 ${
            isDarkMode ? "bg-gray-600 text-gray-200" : ""
          } ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <MoonIcon />
          <span>{navTranslations.dark}</span>
        </MenuItem>
      </div>

      {/* Language Section */}
      <div className={`font-medium mb-1 ${isRTL ? "text-right" : "text-left"}`}>
        {navTranslations.language}
      </div>
      <div className="flex flex-row items-center justify-center border border-gray-300 dark:border-gray-600 rounded-md mb-3">
        <MenuItem
          onClick={() => handleLanguageChange("en")}
          className={`flex items-center gap-3 py-2 flex-1 ${
            language === "en" ? "bg-blue-100 text-blue-500" : ""
          }`}
        >
          {translations.english}
        </MenuItem>
        <div className="w-px h-10 bg-gray-300 dark:bg-gray-600"></div>
        <MenuItem
          onClick={() => handleLanguageChange("fa")}
          className={`flex items-center gap-3 py-2 flex-1 ${
            language === "fa" ? "bg-blue-100 text-blue-500" : ""
          }`}
        >
          {translations.farsi}
        </MenuItem>
      </div>

      {/* Exit */}
      <div className="border-t border-gray-300 dark:border-gray-600 pt-3 mt-3">
        <MenuItem
          onClick={handleExit}
          className={`flex items-center gap-3 text-red-600 dark:text-red-400 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <MdExitToApp />
          {navTranslations.exit}
        </MenuItem>
      </div>
    </div>
  );

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <nav
        className={`h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-md ${
          isDarkMode ? "bg-[#292F45]" : "bg-[#F3FAFE]"
        }`}
      >
        <div className="flex items-center gap-2 text-[#003464] dark:text-[#A7C6ED]">
          <img src="./logo.svg" alt="logo" className="w-8 h-8" />
          <p
            className={`hidden sm:block font-normal text-[12px] font-roboto ${
              isDarkMode ? "text-[#F3F4F7]" : "text-[#003464]"
            }`}
          >
            {navTranslations.weatherDashboard}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <SelectCity city={city} setCity={setCity} isDarkMode={isDarkMode} />
          <IconButton
            name="setting"
            onClick={handleSettingsClick}
            className="w-10 h-10 border-2 border-[#BBC1C4] p-2 rounded-lg flex items-center justify-center text-[#BBC1C4] focus:text-blue-500 transition-colors duration-300"
          >
            <MdOutlineSettings className="w-6 h-6" />
          </IconButton>
        </div>
      </nav>

      {/* Desktop Settings Menu */}
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        open={open && !isMobile}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            style: {
              width: "200px",
              padding: "8px",
              direction: isRTL ? "rtl" : "ltr",
            },
          },
        }}
      >
        {SettingsContent}
      </Menu>

      <Drawer
        anchor={isRTL ? "right" : "left"}
        open={mobileDrawerOpen}
        onClose={handleClose}
      >
        {SettingsContent}
      </Drawer>
    </div>
  );
};

export default Navbar;
