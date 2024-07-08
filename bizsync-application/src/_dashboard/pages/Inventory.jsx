import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const Inventory = () => {
  // Sample data for the pie chart
  const pieChartData = [
    { name: "Overdue", value: 400 },
    { name: "Soon to be overdue", value: 300 },
    { name: "Lorem Ipsum", value: 200 },
    { name: "Lorem Ipsum", value: 100 },
  ];

  const COLORS = ["#0088FE", "#8884d8", "#FF8042", "#00C49F"];

  // Sample data for the item details table
  const itemDetailsData = [
    {
      item: "xyz item",
      sales: 12243,
      cost: 100,
      revenue: 3290,
      inventory: 130,
    },
    {
      item: "xyz item",
      sales: 12243,
      cost: 100,
      revenue: 3290,
      inventory: 130,
    },
    {
      item: "xyz item",
      sales: 12243,
      cost: 100,
      revenue: 3290,
      inventory: 130,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#121212] text-white p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2 bg-black rounded-md border border-[#27272A] p-4">
          <h3 className="text-xl font-semibold mb-4">Product Details</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-red-500">
                Low on stock <span className="text-white ml-2">3</span>
              </p>
              <p>
                All item group <span className="ml-2">10</span>
              </p>
              <p>
                All items <span className="ml-2">21</span>
              </p>
            </div>
            <div className="w-48 h-48">
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
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 10, label: "To be placed" },
              { value: 22, label: "To be shipped" },
              { value: 3, label: "To be shipped" },
              { value: 5, label: "To be delivered" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-black rounded-md border border-[#27272A] p-4 flex flex-col items-center justify-center"
              >
                <p className="text-3xl font-bold">{item.value}</p>
                <p className="text-sm text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-black rounded-md border border-[#27272A] p-4">
        <h3 className="text-xl font-semibold mb-2">Item Details</h3>
        <p className="text-gray-400 mb-4">Detailed analytics of you items</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-2">Item</th>
                <th className="pb-2">Sales</th>
                <th className="pb-2">Cost</th>
                <th className="pb-2">Revenue</th>
                <th className="pb-2">Inventory</th>
              </tr>
            </thead>
            <tbody>
              {itemDetailsData.map((item, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="py-2">{item.item}</td>
                  <td className="py-2">{item.sales}</td>
                  <td className="py-2">$ {item.cost}</td>
                  <td className="py-2">$ {item.revenue}</td>
                  <td className="py-2">{item.inventory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
