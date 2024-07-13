import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const dashboardItems = [
  { name: "Home", path: "home" },
  { name: "Receivables", path: "receivables" },
  { name: "Spends", path: "spends" },
  { name: "Inventory", path: "inventory" },
  { name: "Notification", path: "notification" },
  { name: "Spends", path: "spends" },
  { name: "Supplier", path: "Supplier" },
  { name: "Staff", path: "Staff" },
  { name: "Financial", path: "financial" },
  { name: "Sales", path: "sales" },
  { name: "Reports", path: "reports" },
];

const DashboardLayout = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen w-full bg-[#151518] text-white flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out bg-black w-64 flex flex-col z-30`}
      >
        <p className="font-bold p-4">BizSync</p>
        <ul className="ml-4 space-y-1 mt-16">
          {dashboardItems.map((item) => (
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

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="bg-black p-4 flex items-center md:hidden">
          <button
            onClick={toggleSidebar}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Content area */}
        <div className="">
          <Outlet />
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
