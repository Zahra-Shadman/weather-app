import { IoLocation } from "react-icons/io5";

export default function CurrentTemperature() {
  return (
    <div>
      <section className="flex flex-1/2 justify-between">
        <div className=" flex flex-col justify-center p-4 ">
          <div className="flex bg-[#CDD9E0]  rounded-full p-4 font-normal h-10 flex-row w-full gap-2 text-[#3D4852] items-center">
            <IoLocation />
            <h1 className=""> San Francisco</h1>
          </div>
          <div className="flex flex-col py-4">
            <h1 className="text-3xl text-[#003464]">Monday</h1>
            <span className="flex gap-5 text-sm font-roboto  text-[#003464] py-1 ">
              24 Dec, 2023 <span>11:45 AM</span>
            </span>
          </div>
          <div>
            <h1 className="text-[#003464] text-4xl font "> 26° C</h1>
            <span className="text-sm text-[#003464] flex gap-2">
              High: 27 <span>Low: 10</span>
            </span>
          </div>
        </div>
        <div className="py-5 px-7">
          <img
            className="w-46 h-32"
            src="./sun cloud dash.svg"
            alt="sun cloud"
          />
          <h1 className="text-4xl text-[#003464] font-light ">Cloudy</h1>
          <h2 className="py-1 text-sm text-[#003464]">Feels Like 26</h2>
        </div>
      </section>
    </div>
  );
}
