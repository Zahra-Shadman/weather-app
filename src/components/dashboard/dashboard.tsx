import React, { useState } from "react";
import Navbar from "./navbar";
import WeekForecast from "./weekForecast";
import AverageTemperature from "./AverageTemprature";
import CurrentTemperature from "./currentTemperature";
import Footer from "./footer";

const Dashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Tehran");

  return (
    <div className="min-h-screen bg-[#F3FAFE] dark:bg-[#151D32] flex flex-col">
      <Navbar city={selectedCity} setCity={setSelectedCity} />
      <main className="max-w-[1320px] mx-auto p-6 flex flex-col gap-6">
        <div className="flex p-2 gap-6">
          <div className="w-[604px] h-[234px] bg-[#E1E9EE] rounded-3xl shadow-md text-xl font-semibold">
            <CurrentTemperature city={selectedCity} />
          </div>
          <AverageTemperature />
        </div>
        <WeekForecast city={selectedCity} />
        <Footer />
      </main>
    </div>
  );
};

export default Dashboard;
