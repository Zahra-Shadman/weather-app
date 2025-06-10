import React, { useState } from "react";
import Navbar from "./navbar";
import WeekForecast from "./weekForecast";
import AverageTemperature from "./AverageTemprature";
import CurrentTemperature from "./currentTemperature";
import Footer from "./footer";
import { useLanguage } from "../../utils/loginTranslator";

const Dashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Tehran");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const { isRTL } = useLanguage();

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "dark bg-[#151D32]" : "bg-[#ffff]"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Navbar
        city={selectedCity}
        setCity={setSelectedCity}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <main className="max-w-[1320px] mx-auto p-6 flex flex-col gap-6">
        <div className="flex p-2 gap-6 flex-col sm:flex-row"> {/* Modified this line */}
          {isRTL ? (
            <>
              <AverageTemperature city={selectedCity} isDarkMode={isDarkMode} />
              <div>
                <CurrentTemperature city={selectedCity} isDarkMode={isDarkMode} />
              </div>
            </>
          ) : (
            <div className="flex gap-12">
              <div>
                <CurrentTemperature city={selectedCity} isDarkMode={isDarkMode} />
              </div>
              <AverageTemperature city={selectedCity} isDarkMode={isDarkMode} />
            </div>
          )}
        </div>
        <WeekForecast city={selectedCity} isDarkMode={isDarkMode} />
        <Footer isDarkMode={isDarkMode} />
      </main>
    </div>
  );
};

export default Dashboard;
