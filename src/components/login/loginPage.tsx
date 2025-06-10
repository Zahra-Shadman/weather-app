import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useLanguage } from "../../utils/loginTranslator";
import SelectVariants from "./languageSelectInput";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonSharp } from "react-icons/io5";

const SunIcon = () => (
  <IoSunnyOutline className="text-yellow-400" />
);

const MoonIcon = () => (
  <IoMoonSharp className="text-grey-800" />
);

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const navigate = useNavigate();
  const { translations, isRTL } = useLanguage();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError(translations.usernameError);
      return;
    }
    if (trimmedUsername.length < 2) {
      setError("Username must be at least 2 characters long.");
      return;
    }
    if (/^\d+$/.test(trimmedUsername)) {
      setError("Username cannot be just numbers");
      return;
    }

    setError(null);
    setOpenSnackbar(true);
    localStorage.setItem("username", trimmedUsername);
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center px-4 p-6 sm:p-8 lg:p-4 ${
        isDarkMode 
          ? 'bg-[#151D32]' 
          : 'bg-blue-50'
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="fixed top-4 left-4 z-10">
        <IconButton
          onClick={toggleTheme}
          className="bg-gray-400 shadow-lg"
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </IconButton>
      </div>

      <div className="flex justify-center w-full">
        <div className={`w-full max-w-6xl rounded-xl min-h-[590px] flex flex-col lg:flex-row overflow-hidden shadow-lg ${
          isDarkMode 
            ? 'bg-[#292F45]' 
            : 'bg-white'
        }`}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-12 lg:gap-12 px-6 sm:px-8 lg:px-14 flex-1 justify-center py-8 lg:py-0"
          >
            <div className="flex flex-col w-full items-center gap-6">
              <h1
                className={`font-sans text-xl sm:text-3xl font-bold ${
                  isDarkMode 
                    ? 'text-white' 
                    : 'text-[#050F24]'
                }`}
              >
                {translations.login}
              </h1>
              <div className="w-full max-w-md">
                <input
                  placeholder={translations.enterUsername}
                  className={`border-2 mt-8 rounded-md w-full h-[56px] px-4 focus:outline-none focus:border-blue-600 ${
                    isDarkMode 
                      ? 'text-white bg-[#292F45] border-gray-600' 
                      : 'border-gray-200'
                  } ${isRTL ? "text-right" : "text-left"}`}
                  style={{ direction: isRTL ? "rtl" : "ltr" }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {error && (
                  <p
                    className={`text-red-500 text-sm mt-2 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {error}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full max-w-md mx-auto mt-36">
              <Button
                type="submit"
                variant="contained"
                className="w-full h-[46px]"
              >
                {translations.loginButton}
              </Button>
            </div>
          </form>
          <div className={`hidden lg:flex flex-1 flex-col justify-center items-center relative p-8 ${
            isDarkMode 
              ? 'bg-[#404961]' 
              : 'bg-[#D3E1E7]'
          }`}>
            <div className="absolute top-8 right-8">
              <img
                className="h-92 w-92 relative"
                src="./Moon cloud mid rain.svg"
                alt="Moon cloud mid rain"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                className="h-92 w-92 relative mr-52 mt-24"
                src="./Sun cloud angled rain.svg"
                alt="Sun cloud angled rain"
              />
            </div>
            <div className="absolute bottom-8 right-8">
              <img
                className="h-92 w-92 relative mb-[-80px]"
                src="./Moon cloud fast wind.svg"
                alt="Moon cloud fast wind"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-2 w-full max-w-md">
        <SelectVariants />
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
        login 
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginPage;