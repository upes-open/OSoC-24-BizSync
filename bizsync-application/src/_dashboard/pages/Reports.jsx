import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  const [financialCriteria, setFinancialCriteria] = useState({
    startDate: "",
    endDate: "",
    category: "All",
  });

  const [staffCriteria, setStaffCriteria] = useState({
    startDate: "",
    endDate: "",
    metric: "Sales",
  });

  const [inventoryCriteria, setInventoryCriteria] = useState({
    type: "Low Stock",
  });

  // Sample data for the sales chart
  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4500 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 5500 },
  ];

  const handleGenerateReport = (type) => {
    // Placeholder for report generation logic
    console.log(
      `Generating ${type} report with criteria:`,
      type === "Financial"
        ? financialCriteria
        : type === "Staff"
        ? staffCriteria
        : inventoryCriteria
    );
  };

  return (
    <div className="w-full bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Reports and Analytics</h2>

      {/* Financial Reports Section */}
      <div className="mb-8 border border-[#27272A] rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Financial Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <input
            type="date"
            placeholder="Start Date"
            value={financialCriteria.startDate}
            onChange={(e) =>
              setFinancialCriteria({
                ...financialCriteria,
                startDate: e.target.value,
              })
            }
            className="bg-black border border-[#27272A] p-2 rounded w-full"
          />
          <input
            type="date"
            placeholder="End Date"
            value={financialCriteria.endDate}
            onChange={(e) =>
              setFinancialCriteria({
                ...financialCriteria,
                endDate: e.target.value,
              })
            }
            className="bg-black border border-[#27272A] p-2 rounded w-full"
          />
          <select
            value={financialCriteria.category}
            onChange={(e) =>
              setFinancialCriteria({
                ...financialCriteria,
                category: e.target.value,
              })
            }
            className="bg-black border border-[#27272A] p-2 rounded w-full"
          >
            <option value="All">All Categories</option>
            <option value="Income">Income</option>
            <option value="Expenses">Expenses</option>
          </select>
        </div>
        <button
          onClick={() => handleGenerateReport("Financial")}
          className="bg-white text-black px-4 py-2 rounded w-full sm:w-auto"
        >
          Generate Financial Report
        </button>
      </div>

      {/* Staff Performance Reports Section */}
      <div className="mb-8 border border-[#27272A] rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">
          Staff Performance Reports
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <input
            type="date"
            placeholder="Start Date"
            value={staffCriteria.startDate}
            onChange={(e) =>
              setStaffCriteria({ ...staffCriteria, startDate: e.target.value })
            }
            className="bg-black border border-[#27272A] p-2 rounded w-full"
          />
          <input
            type="date"
            placeholder="End Date"
            value={staffCriteria.endDate}
            onChange={(e) =>
              setStaffCriteria({ ...staffCriteria, endDate: e.target.value })
            }
            className="bg-black border border-[#27272A] p-2 rounded w-full"
          />
          <select
            value={staffCriteria.metric}
            onChange={(e) =>
              setStaffCriteria({ ...staffCriteria, metric: e.target.value })
            }
            className="bg-black border border-[#27272A] p-2 rounded w-full"
          >
            <option value="Sales">Sales Performance</option>
            <option value="Attendance">Attendance</option>
          </select>
        </div>
        <button
          onClick={() => handleGenerateReport("Staff")}
          className="bg-white text-black px-4 py-2 rounded w-full sm:w-auto"
        >
          Generate Staff Performance Report
        </button>
      </div>

      {/* Inventory Reports Section */}
      <div className="mb-8 border border-[#27272A] rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Inventory Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <select
            value={inventoryCriteria.type}
            onChange={(e) =>
              setInventoryCriteria({
                ...inventoryCriteria,
                type: e.target.value,
              })
            }
            className="bg-black border border-[#27272A] p-2 rounded w-full"
          >
            <option value="Low Stock">Low Stock Items</option>
            <option value="All">All Stock Levels</option>
          </select>
        </div>
        <button
          onClick={() => handleGenerateReport("Inventory")}
          className="bg-white text-black px-4 py-2 rounded w-full sm:w-auto"
        >
          Generate Inventory Report
        </button>
      </div>

      {/* Sales Analytics Section */}
      <div className="border border-[#27272A] rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Sales Analytics</h3>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="name" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "black",
                  border: "1px solid #27272A",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="white" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
