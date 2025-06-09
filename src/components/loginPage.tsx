import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectVariants from "./mui/languageSelectInput";
import Button from "@mui/material/Button";
import { useLanguage } from "../utils/loginTranslator";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { translations, isRTL } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      console.log("Username:", username);
      localStorage.setItem("username", username);
      navigate("/dashboard");
    } else {
      setError(translations.usernameError);
    }
  };

  return (
    <div
      className={`min-h-screen bg-blue-50 dark:bg-[#151D32] flex flex-col items-center px-4 p-6 sm:p-8 lg:p-4`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="flex justify-center w-full">
        <div className="bg-white w-full max-w-6xl rounded-xl min-h-[590px] flex flex-col lg:flex-row overflow-hidden shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-12 lg:gap-12 px-6 sm:px-8 lg:px-14 flex-1 justify-center py-8 lg:py-0"
          >
            <div className="flex flex-col w-full items-center gap-6">
              <h1
                className={`font-sans text-xl sm:text-3xl text-[#050F24] font-bold`}
              >
                {translations.login}
              </h1>
              <div className="w-full max-w-md">
                <input
                  placeholder={translations.enterUsername}
                  className={`border-2 mt-8 border-gray-200 rounded-md w-full h-[56px] px-4 focus:outline-none focus:border-blue-600 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
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
          <div className="hidden lg:flex flex-1 bg-[#D3E1E7] flex-col justify-center items-center relative p-8">
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
    </div>
  );
};

export default LoginPage;
