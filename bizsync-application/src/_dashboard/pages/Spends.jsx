import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const Spends = () => {
  // Sample data for the pie chart
  const pieChartData = [
    { name: "Overdue", value: 400 },
    { name: "Soon to be overdue", value: 300 },
    { name: "Current", value: 200 },
    { name: "Paid", value: 100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Sample data for the receivables table
  const receivablesData = [
    {
      customer: "Liam Johnson",
      type: "Invoice",
      status: "Overdue",
      date: "2023-06-23",
      amount: 250.0,
    },
    {
      customer: "Olivia Smith",
      type: "Credit Note",
      status: "Pending",
      date: "2023-06-24",
      amount: 150.0,
    },
    {
      customer: "Noah Williams",
      type: "Invoice",
      status: "Paid",
      date: "2023-06-25",
      amount: 350.0,
    },
    {
      customer: "Emma Brown",
      type: "Invoice",
      status: "Current",
      date: "2023-06-26",
      amount: 450.0,
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#121212] text-white p-4">
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="w-full lg:w-1/3 bg-black rounded-md border border-[#27272A] p-4">
          <h3 className="text-xl font-semibold mb-4">Receivables Status</h3>
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
        <div className="w-full lg:w-2/3 flex flex-col sm:flex-row gap-4">
          <div className="h-[200px] flex-1 bg-black rounded-md border border-[#27272A] p-4 flex items-center flex-col justify-center">
            <h3 className="text-lg font-semibold">This Week</h3>
            <p className="text-3xl font-bold mt-2">$1,329</p>
            <p className="text-sm text-green-500">+25% from last week</p>
          </div>
          <div className="h-[200px] flex-1 bg-black rounded-md border border-[#27272A] p-4 flex items-center flex-col justify-center">
            <h3 className="text-lg font-semibold">This Month</h3>
            <p className="text-3xl font-bold mt-2">$5,329</p>
            <p className="text-sm text-green-500">+10% from last month</p>
          </div>
        </div>
      </div>

      <div className="bg-black rounded-md border border-[#27272A] p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-2xl font-bold mb-2 sm:mb-0">Receivables</h2>
          <div className="flex space-x-2">
            <button className="bg-gray-800 text-white px-3 py-1 rounded-md">
              Week
            </button>
            <button className="bg-gray-700 text-white px-3 py-1 rounded-md">
              Month
            </button>
            <button className="bg-gray-700 text-white px-3 py-1 rounded-md">
              Year
            </button>
          </div>
        </div>
        <p className="text-gray-400 mb-4">
          Recent receivables from your customers.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-2">Customer</th>
                <th className="pb-2">Type</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {receivablesData.map((item, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="py-2">{item.customer}</td>
                  <td className="py-2">{item.type}</td>
                  <td className="py-2">{item.status}</td>
                  <td className="py-2">{item.date}</td>
                  <td className="py-2">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Spends;
