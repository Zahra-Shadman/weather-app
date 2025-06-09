import React from "react";
import Navbar from "./navbar";
import WeekForecast from "./dashboard/weekForecast";
import AverageTemperature from "./dashboard/AverageTemprature";
import CurrentTemperature from "./dashboard/currentTemperature";
import Footer from "./footer";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F3FAFE] dark:bg-[#151D32] flex flex-col">
      <Navbar />
      <main className="max-w-[1320px] mx-auto p-6 flex flex-col gap-6">
        <div className="flex  p-2 gap-4">
          <div className="w-[604px] h-[234px] bg-[#E1E9EE] rounded-3xl shadow-md  text-xl font-semibold">
            <CurrentTemperature />
          </div>
          <AverageTemperature />
        </div>
        <WeekForecast />
        <Footer />
      </main>
    </div>
  );
};

export default Dashboard;
