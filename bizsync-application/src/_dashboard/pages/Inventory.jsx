import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import { AddItemModal } from "../../components/AddItemModal";

const Inventory = () => {
  // Sample data for the pie chart
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState({});
  const [lowStock, setLowStock] = useState(0);
  const [items, setItems] = useState([]);
  const pieChartData = [
    { name: "Overdue", value: 400 },
    { name: "Soon to be overdue", value: 300 },
    { name: "Lorem Ipsum", value: 200 },
    { name: "Lorem Ipsum", value: 100 },
  ];

  const COLORS = ["#0088FE", "#8884d8", "#FF8042", "#00C49F"];

  const getLowItem = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8001/api/v1/inventory/low",
        {},
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyZWY3MzJhOThmZTliZTAyODM2ZGQiLCJlbWFpbCI6InByaXlhbnNodWJ1dG9sYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InByaXlhbnNodSIsIm9yZ2FuaXphdGlvbiI6InVwZXMiLCJpYXQiOjE3MjA5MDU2MzQsImV4cCI6MTAwMDAwMTcyMDkwNTYzNH0.ujV1UyQdSTRnK98H0a57Io_PaFrNbS3jDMzWF1bBlxE",
          },
        }
      );

      console.log(response.data.data);
      setLowStock(response.data.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const getInventory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/v1/inventory",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyZWY3MzJhOThmZTliZTAyODM2ZGQiLCJlbWFpbCI6InByaXlhbnNodWJ1dG9sYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InByaXlhbnNodSIsIm9yZ2FuaXphdGlvbiI6InVwZXMiLCJpYXQiOjE3MjA5MDU2MzQsImV4cCI6MTAwMDAwMTcyMDkwNTYzNH0.ujV1UyQdSTRnK98H0a57Io_PaFrNbS3jDMzWF1bBlxE",
          },
        }
      );

      console.log(response.data.data);
      setItems(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      const response = await axios.post(
        "http://localhost:8001/api/v1/inventory",
        {
          name: newItem.name,
          quantity: Number.parseInt(newItem.quantity),
          reorderLevel: Number.parseInt(newItem.reorderLevel),
          status: newItem.status,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyZWY3MzJhOThmZTliZTAyODM2ZGQiLCJlbWFpbCI6InByaXlhbnNodWJ1dG9sYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InByaXlhbnNodSIsIm9yZ2FuaXphdGlvbiI6InVwZXMiLCJpYXQiOjE3MjA5MDU2MzQsImV4cCI6MTAwMDAwMTcyMDkwNTYzNH0.ujV1UyQdSTRnK98H0a57Io_PaFrNbS3jDMzWF1bBlxE",
          },
        }
      );

      console.log(response.data.data);
      setItems([...items, response.data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleItemUpdate = async (updatedItem) => {
    try {
      const response = await axios.put(
        `http://localhost:8001/api/v1/inventory/${currentEditItem._id}`,
        {
          name: updatedItem.name,
          quantity: Number.parseInt(updatedItem.quantity),
          reorderLevel: Number.parseInt(updatedItem.reorderLevel),
          status: updatedItem.status,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyZWY3MzJhOThmZTliZTAyODM2ZGQiLCJlbWFpbCI6InByaXlhbnNodWJ1dG9sYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InByaXlhbnNodSIsIm9yZ2FuaXphdGlvbiI6InVwZXMiLCJpYXQiOjE3MjA5MDU2MzQsImV4cCI6MTAwMDAwMTcyMDkwNTYzNH0.ujV1UyQdSTRnK98H0a57Io_PaFrNbS3jDMzWF1bBlxE",
          },
        }
      );

      console.log(response.data.data);
      getInventory();
      // setItems([...items, response.data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleItemEdit = (item) => {
    setCurrentEditItem(item);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    getInventory();
    getLowItem();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#121212] text-white p-4">
      {/* Add Item Button */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-white text-black hover:bg-[#dedede] px-4 py-2 rounded-md mb-4 w-full sm:w-auto"
      >
        Add Item
      </button>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddItem}
      />

      {/* Update Item Modal */}
      <AddItemModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleItemUpdate}
        item={currentEditItem}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2 bg-black rounded-md border border-[#27272A] p-4">
          <h3 className="text-xl font-semibold mb-4">Product Details</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-red-500">
                Low on stock <span className="text-white ml-2">{lowStock}</span>
              </p>
              <p>
                All item group <span className="ml-2">10</span>
              </p>
              <p>
                All items <span className="ml-2">{items.length}</span>
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
                <th className="pb-2">Quantity</th>
                <th className="pb-2">Reorder Level</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">0</td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">{item.reorderLevel}</td>
                  <td className="py-2">{item.status}</td>
                  <td className="py-2">
                    <button
                      className="text-blue-500"
                      onClick={() => handleItemEdit(item)}
                    >
                      Update
                    </button>
                  </td>
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
