import React, { useState, useEffect } from "react";
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
import axios from "axios";

const Sales = () => {
  const [salesOrders, setSalesOrders] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [returnOrder, setReturnOrder] = useState({
    saleId: "",
    productId: "",
  });
  const [reportCriteria, setReportCriteria] = useState({
    date: "",
    // endDate: "",
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

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8001/api/v1/reports/sales/?date=${reportCriteria.date}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyZWY3MzJhOThmZTliZTAyODM2ZGQiLCJlbWFpbCI6InByaXlhbnNodWJ1dG9sYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InByaXlhbnNodSIsIm9yZ2FuaXphdGlvbiI6InVwZXMiLCJpYXQiOjE3MjA5MDU2MzQsImV4cCI6MTAwMDAwMTcyMDkwNTYzNH0.ujV1UyQdSTRnK98H0a57Io_PaFrNbS3jDMzWF1bBlxE",
          },
        }
      );

      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getSales = async () => {
    try {
      const response = await axios.get("http://localhost:8001/api/v1/sales", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyZWY3MzJhOThmZTliZTAyODM2ZGQiLCJlbWFpbCI6InByaXlhbnNodWJ1dG9sYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InByaXlhbnNodSIsIm9yZ2FuaXphdGlvbiI6InVwZXMiLCJpYXQiOjE3MjA5MDU2MzQsImV4cCI6MTAwMDAwMTcyMDkwNTYzNH0.ujV1UyQdSTRnK98H0a57Io_PaFrNbS3jDMzWF1bBlxE",
        },
      });

      console.log(response.data.data);
      setSalesOrders(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const processReturns = async (saleId, productId) => {
    try {
      const response = await axios.post(
        "http://localhost:8001/api/v1/returns",
        {
          orderId: returnOrder.saleId,
          items: [returnOrder.productId],
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyZWY3MzJhOThmZTliZTAyODM2ZGQiLCJlbWFpbCI6InByaXlhbnNodWJ1dG9sYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InByaXlhbnNodSIsIm9yZ2FuaXphdGlvbiI6InVwZXMiLCJpYXQiOjE3MjA5MDU2MzQsImV4cCI6MTAwMDAwMTcyMDkwNTYzNH0.ujV1UyQdSTRnK98H0a57Io_PaFrNbS3jDMzWF1bBlxE",
          },
        }
      );

      console.log(response.data.data);
      setReturnOrder({ saleId: "", productId: "" });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSales();
  }, []);
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

            {salesOrders.length === 0 ? (
              <div className="w-full p-10">No Sales</div>
            ) : (
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
            )}
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
            placeholder="Sale ID"
            value={returnOrder.saleId}
            onChange={(e) =>
              setReturnOrder({ ...returnOrder, saleId: e.target.value })
            }
            className="bg-black border border-[#27272A] p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Product ID"
            value={returnOrder.productId}
            onChange={(e) =>
              setReturnOrder({ ...returnOrder, productId: e.target.value })
            }
            className="bg-black border border-[#27272A] p-2 rounded w-full"
          />
        </div>
        <button
          onClick={processReturns}
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
            placeholder="Date"
            value={reportCriteria.date}
            onChange={(e) =>
              setReportCriteria({
                ...reportCriteria,
                date: e.target.value,
              })
            }
            className="bg-black border border-[#27272A] p-2 rounded w-full"
          />
          {/* <input
            type="date"
            placeholder="End Date"
            value={reportCriteria.endDate}
            onChange={(e) =>
              setReportCriteria({ ...reportCriteria, endDate: e.target.value })
            }
            className="bg-black border border-[#27272A] p-2 rounded w-full"
          /> */}
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
