import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const dashboardItems = [
  {
    name: "Home",
    path: "home",
  },
  {
    name: "Receivables",
    path: "",
  },
  {
    name: "Spends",
    path: "",
  },
  {
    name: "Inventory",
    path: "",
  },
  {
    name: "Notification",
    path: "",
  },
];
const DashboardLayout = () => {
  const [activeItem, setActiveItem] = useState("Home");

  return (
    <div className="min-h-screen w-full bg-[#151518] text-white flex">
      <div className="md:flex flex-col hidden bg-black h-screen w-64 space-y-16">
        <p className="font-bold p-4">BizSync</p>
        <ul className="ml-4 space-y-1">
          {dashboardItems.map((item, idx) => (
            <li
              key={item.name}
              className={`rounded-l-lg p-3 cursor-pointer transition-colors duration-200 ${
                activeItem === item.name
                  ? "bg-white text-black"
                  : "bg-transparent text-white hover:bg-white hover:text-black"
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
