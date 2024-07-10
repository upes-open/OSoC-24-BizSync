import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Sales = () => {
  const [salesOrders, setSalesOrders] = useState([
    {
      id: 1,
      orderNumber: "SO-001",
      date: "2024-07-01",
      customerName: "John Doe",
      totalAmount: 500,
      status: "Completed",
    },
    {
      id: 2,
      orderNumber: "SO-002",
      date: "2024-07-02",
      customerName: "Jane Smith",
      totalAmount: 750,
      status: "Pending",
    },
    {
      id: 3,
      orderNumber: "SO-003",
      date: "2024-07-03",
      customerName: "Bob Johnson",
      totalAmount: 1000,
      status: "Processing",
    },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [returnOrder, setReturnOrder] = useState({
    orderNumber: "",
    reason: "",
  });
  const [reportCriteria, setReportCriteria] = useState({
    startDate: "",
    endDate: "",
    type: "Sales Performance",
  });

  // Sample data for the sales chart
  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4500 },
    { month: "May", sales: 6000 },
    { month: "Jun", sales: 5500 },
  ];

  const handleCustomerSelect = (customerName) => {
    // In a real application, you would fetch customer details from an API
    setSelectedCustomer({
      name: customerName,
      email: `${customerName.toLowerCase().replace(" ", ".")}@example.com`,
      phone: "123-456-7890",
      address: "123 Main St, Anytown, USA",
    });
  };

  const handleReturnSubmit = () => {
    console.log("Processing return:", returnOrder);
    // Here you would typically send this data to your backend
    setReturnOrder({ orderNumber: "", reason: "" });
  };

  const handleGenerateReport = () => {
    console.log("Generating report with criteria:", reportCriteria);
    // Here you would typically generate the report based on the criteria
  };

  return (
    <div className="w-full bg-[#121212] text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Sales Management</h2>

      {/* Sales Orders Section */}
      <div className="mb-8 border bg-black border-[#27272A] rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Sales Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#27272A]">
                <th className="p-2 text-left">Order Number</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Customer</th>
                <th className="p-2 text-left">Total Amount</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {salesOrders.map((order) => (
                <tr key={order.id} className="border-b border-[#27272A]">
                  <td className="p-2">{order.orderNumber}</td>
                  <td className="p-2">{order.date}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleCustomerSelect(order.customerName)}
                      className="text-blue-500 hover:underline"
                    >
                      {order.customerName}
                    </button>
                  </td>
                  <td className="p-2">${order.totalAmount}</td>
                  <td className="p-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Section */}
      <div className="mb-8 border bg-black border-[#27272A] rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
        {selectedCustomer ? (
          <div>
            <p>
              <strong>Name:</strong> {selectedCustomer.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedCustomer.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedCustomer.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedCustomer.address}
            </p>
          </div>
        ) : (
          <p>Select a customer from the Sales Orders table to view details.</p>
        )}
      </div>

      {/* Returns Section */}
      <div className="mb-8 border bg-black border-[#27272A] rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Process Return</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Order Number"
            value={returnOrder.orderNumber}
            onChange={(e) =>
              setReturnOrder({ ...returnOrder, orderNumber: e.target.value })
            }
            className="bg-black border border-[#27272A] p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Reason for Return"
            value={returnOrder.reason}
            onChange={(e) =>
              setReturnOrder({ ...returnOrder, reason: e.target.value })
            }
            className="bg-black border border-[#27272A] p-2 rounded w-full"
          />
        </div>
        <button
          onClick={handleReturnSubmit}
          className="bg-white text-black px-4 py-2 rounded w-full sm:w-auto"
        >
          Process Return
        </button>
      </div>

      {/* Sales Reports Section */}
      <div className="mb-8 border bg-black border-[#27272A] rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Sales Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <input
            type="date"
            placeholder="Start Date"
            value={reportCriteria.startDate}
            onChange={(e) =>
              setReportCriteria({
                ...reportCriteria,
                startDate: e.target.value,
              })
            }
            className="bg-black border border-[#27272A] p-2 rounded w-full"
          />
          <input
            type="date"
            placeholder="End Date"
            value={reportCriteria.endDate}
            onChange={(e) =>
              setReportCriteria({ ...reportCriteria, endDate: e.target.value })
            }
            className="bg-black border border-[#27272A] p-2 rounded w-full"
          />
          <select
            value={reportCriteria.type}
            onChange={(e) =>
              setReportCriteria({ ...reportCriteria, type: e.target.value })
            }
            className="bg-black border border-[#27272A] p-2 rounded w-full"
          >
            <option value="Sales Performance">Sales Performance</option>
            <option value="Customer Analytics">Customer Analytics</option>
            <option value="Product Trends">Product Trends</option>
          </select>
        </div>
        <button
          onClick={handleGenerateReport}
          className="bg-white text-black px-4 py-2 rounded w-full sm:w-auto"
        >
          Generate Report
        </button>
      </div>

      {/* Sales Chart */}
      <div className="border bg-black border-[#27272A] rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Sales Trend</h3>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="month" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "black",
                  border: "1px solid #27272A",
                }}
              />
              <Legend />
              <Bar dataKey="sales" fill="white" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Sales;
