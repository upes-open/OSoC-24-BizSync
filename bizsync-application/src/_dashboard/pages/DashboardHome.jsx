import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DashboardHome = () => {
  // Sample data for the line chart
  const lineChartData = [
    { name: "Page A", pv: 2400, uv: 4000 },
    { name: "Page B", pv: 1398, uv: 3000 },
    { name: "Page C", pv: 9800, uv: 2000 },
    { name: "Page D", pv: 3908, uv: 2780 },
    { name: "Page E", pv: 4800, uv: 1890 },
    { name: "Page F", pv: 3800, uv: 2390 },
    { name: "Page G", pv: 4300, uv: 3490 },
  ];

  // Sample data for the pie chart
  const pieChartData = [
    { name: "Overdue", value: 400 },
    { name: "Soon to be overdue", value: 300 },
    { name: "Lorem Ipsum", value: 200 },
    { name: "Lorem Ipsum", value: 100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="w-full h-screen flex flex-col bg-[#121212] text-white overflow-hidden">
      <div className="p-4 flex-grow overflow-y-auto">
        <div className="bg-noen p-4 flex justify-end items-center gap-4">
          <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200">
            Add new item
          </button>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Spends & Earnings</h2>
        <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="p-4 bg-black rounded-md border border-[#27272A] flex flex-col space-y-1 flex-1">
            <p className="text-sm">Total Revenue</p>
            <p className="font-semibold text-2xl">$45,231.89</p>
            <p className="text-xs text-[#A1A1AA]">+20.1% from last month</p>
          </div>
          <div className="p-4 bg-black rounded-md border border-[#27272A] flex flex-col space-y-1 flex-1">
            <p className="text-sm">Subscriptions</p>
            <p className="font-semibold text-2xl">+2350</p>
            <p className="text-xs text-[#A1A1AA]">+180.1% from last month</p>
          </div>
          <div className="p-4 bg-black rounded-md border border-[#27272A] flex flex-col space-y-1 flex-1">
            <p className="text-sm">Sales</p>
            <p className="font-semibold text-2xl">+12,234</p>
            <p className="text-xs text-[#A1A1AA]">+19% from last month</p>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="w-full bg-black rounded-md border border-[#27272A] p-4">
            <h3 className="text-xl font-semibold mb-4">Spends & Earnings</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <XAxis dataKey="name" stroke="#A1A1AA" />
                  <YAxis stroke="#A1A1AA" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#00C49F"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#0088FE"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="md:w-96 bg-black rounded-md border border-[#27272A] p-4">
            <h3 className="text-xl font-semibold mb-4">Expenses</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
