import React, { useState } from "react";
import Navbar from "./navbar";
import WeekForecast from "./weekForecast";
import AverageTemperature from "./AverageTemprature";
import CurrentTemperature from "./currentTemperature";
import Footer from "./footer";

const Dashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Tehran");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "dark bg-[#151D32]" : "bg-[#F3FAFE]"
      }`}
    >
      <Navbar
        city={selectedCity}
        setCity={setSelectedCity}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <main className="max-w-[1320px] mx-auto p-6 flex flex-col gap-6">
        <div className="flex p-2 gap-6">
          <div className="w-[604px] h-[234px] bg-[#E1E9EE] dark:bg-[#292F45] rounded-3xl shadow-md text-xl font-semibold">
            <CurrentTemperature city={selectedCity} isDarkMode={isDarkMode} />
          </div>
          <AverageTemperature city={selectedCity} isDarkMode={isDarkMode} />{" "}
        </div>
        <WeekForecast city={selectedCity} isDarkMode={isDarkMode} />
        <Footer isDarkMode={isDarkMode}  />
      </main>
    </div>
  );
};

export default Dashboard;
