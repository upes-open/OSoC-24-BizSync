import React from "react";

const DashboardHome = () => {
  return (
    <div className="w-full min-h-screen p-4 flex flex-col">
      <div className="p-4 bg-black rounded-md border border-[#27272A] md:mx-10 flex space-x-2">
        <div className="p-4 bg-none rounded-md border-[#27272A] border flex flex-col space-y-1 w-80">
          <p className="text-sm">Total Revenue</p>
          <p className="font-semibold text-2xl">$45,231.89</p>
          <p className="text-xs text-[#A1A1AA]">+20.1% from last month</p>
        </div>
        <div className="p-4 bg-none rounded-md border-[#27272A] border flex flex-col space-y-1 w-80">
          <p className="text-sm">Total Revenue</p>
          <p className="font-semibold text-2xl">$45,231.89</p>
          <p className="text-xs text-[#A1A1AA]">+20.1% from last month</p>
        </div>
        <div className="p-4 bg-none rounded-md border-[#27272A] border flex flex-col space-y-1 w-80">
          <p className="text-sm">Total Revenue</p>
          <p className="font-semibold text-2xl">$45,231.89</p>
          <p className="text-xs text-[#A1A1AA]">+20.1% from last month</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
