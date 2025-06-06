import React, { useState } from "react";
import SelectVariants from "./ui/selectInput";
import BasicTextFields from "./ui/textInput";

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center px-4 py-8">
      <div className="flex justify-center w-full">
        <div className="bg-white w-full max-w-6xl rounded-xl min-h-[590px] flex flex-col lg:flex-row overflow-hidden shadow-lg">
          <div className="flex flex-col gap-6 lg:gap-8 px-6 sm:px-8 lg:px-14 flex-1 justify-center py-8 lg:py-0">
            <div className="flex flex-col w-full items-center gap-6">
              <h1 className="font-sans text-xl sm:text-2xl text-[#050F24] font-bold">
                Login
              </h1>
              <div className="w-full max-w-md">
                <BasicTextFields />
              </div>
            </div>
            <div className="w-full max-w-md mx-auto">
              <button className="w-full h-12 bg-[#2196F3] hover:bg-blue-800 hover:animate-[wiggle_0.5s_ease-in-out] text-white rounded-md transition-colors duration-200">
                LOGIN
              </button>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 bg-[#D3E1E7] flex-col justify-center items-center relative p-8">
            <div className="absolute top-8 right-8">
              <img
                className="h-70 w-70 relative"
                src="./Moon cloud mid rain.svg"
                alt="Moon cloud mid rain"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                className="h-70 w-70 relative mr-32"
                src="./Sun cloud angled rain.svg"
                alt="Sun cloud angled rain"
              />
            </div>
            <div className="absolute bottom-8 right-8">
              <img
                className="h-70 w-70 relative  mb-[-32px]"
                src="./Moon cloud fast wind.svg"
                alt="Moon cloud fast wind"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full max-w-md">
        <SelectVariants />
      </div>
    </div>
  );
};

export default LoginPage;
