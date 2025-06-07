import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-50 dark:bg-[#151D32] flex flex-col items-center px-4 p-6 sm:p-8 lg:p-4">
      <div className="flex justify-center w-full">
        <div className="bg-white w-full max-w-6xl rounded-xl min-h-[590px] flex flex-col lg:flex-row overflow-hidden shadow-lg">
          <div className="flex flex-col gap-12 lg:gap-12 px-6 sm:px-8 lg:px-14 flex-1 justify-center py-8 lg:py-0">
            <h1 className="font-sans text-xl sm:text-3xl text-[#050F24] font-bold">
              Dashboard
            </h1>
            <p>Welcome to the dashboard!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
