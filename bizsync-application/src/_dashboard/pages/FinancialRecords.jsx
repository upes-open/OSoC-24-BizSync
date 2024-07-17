import React, { useState, useEffect } from "react";
import { AddRecordModal } from "../../components/AddRecordModal";
import axios from "axios";

const FinancialRecords = () => {
  const [records, setRecords] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecord, setNewRecord] = useState({
    type: "Income",
    amount: "",
    date: "",
    category: "",
    status: "Pending",
  });

  const [editingRecord, setEditingRecord] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [reportCriteria, setReportCriteria] = useState({
    date: "",
    // type: "All",
  });

  const handleAddRecord = async (newRecord) => {
    try {
      const response = await axios.post(
        "http://localhost:8001/api/v1/financials",
        {
          type: newRecord.type,
          amount: Number.parseInt(newRecord.amount),
          date: Number.parseInt(newRecord.date),
          category: newRecord.category,
          status: newRecord.status,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyZWY3MzJhOThmZTliZTAyODM2ZGQiLCJlbWFpbCI6InByaXlhbnNodWJ1dG9sYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InByaXlhbnNodSIsIm9yZ2FuaXphdGlvbiI6InVwZXMiLCJpYXQiOjE3MjA5MDU2MzQsImV4cCI6MTAwMDAwMTcyMDkwNTYzNH0.ujV1UyQdSTRnK98H0a57Io_PaFrNbS3jDMzWF1bBlxE",
          },
        }
      );

      console.log(response.data.data);
      setRecords([...records, response.data.data]);
    } catch (err) {
      console.log(err);
    }
  };
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEditRecord = (id) => {
    const recordToEdit = records.find((record) => record._id === id);
    setEditingRecord(recordToEdit);
    setIsEditModalOpen(true);
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

  const getFinancials = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/v1/financials",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyZWY3MzJhOThmZTliZTAyODM2ZGQiLCJlbWFpbCI6InByaXlhbnNodWJ1dG9sYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InByaXlhbnNodSIsIm9yZ2FuaXphdGlvbiI6InVwZXMiLCJpYXQiOjE3MjA5MDU2MzQsImV4cCI6MTAwMDAwMTcyMDkwNTYzNH0.ujV1UyQdSTRnK98H0a57Io_PaFrNbS3jDMzWF1bBlxE",
          },
        }
      );

      console.log(response.data.data);
      setRecords(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRecordUpdate = async (updatedItem) => {
    try {
      const response = await axios.put(
        `http://localhost:8001/api/v1/financials/${editingRecord._id}`,
        {
          type: updatedItem.type,
          amount: Number.parseInt(updatedItem.amount),
          date: Number.parseInt(updatedItem.date),
          category: updatedItem.category,
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
      getFinancials();
      // setItems([...items, response.data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      getFinancials();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="w-full bg-[#121212] text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Financial Records</h2>

      {/* Add Record Button */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-white text-black hover:bg-[#dedede] px-4 py-2 rounded-md mb-4 w-full sm:w-auto"
      >
        Add Record
      </button>

      {/* Add Record Modal */}
      <AddRecordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddRecord}
      />

      {/* Add Record Modal */}
      <AddRecordModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleRecordUpdate}
        record={editingRecord}
      />

      {/* Financial Records Table */}
      <div className="overflow-x-auto bg-black rounded-md p-4">
        <table className="w-full ">
          <thead className="">
            <tr>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left hidden sm:table-cell">Date</th>
              <th className="p-2 text-left hidden sm:table-cell">Category</th>
              <th className="p-2 text-left hidden sm:table-cell">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-[#27272A] transition-all">
                <td className="p-2">{record.type}</td>
                <td className="p-2">${record.amount}</td>
                <td className="p-2 hidden sm:table-cell">{record.date}</td>
                <td className="p-2 hidden sm:table-cell">{record.category}</td>
                <td className="p-2 hidden sm:table-cell">{record.status}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEditRecord(record._id)}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Record Form */}
      {/* {editingRecord && (
        <div className="bg-black p-4 rounded-md mt-4">
          <h3 className="text-xl font-semibold mb-2">Edit Record</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={editingRecord.type}
              onChange={(e) =>
                setEditingRecord({ ...editingRecord, type: e.target.value })
              }
              className="bg-[#27272A] p-2 rounded w-full"
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <input
              type="number"
              placeholder="Amount"
              value={editingRecord.amount}
              onChange={(e) =>
                setEditingRecord({ ...editingRecord, amount: e.target.value })
              }
              className="bg-[#27272A] p-2 rounded w-full"
            />
            <input
              type="date"
              value={editingRecord.date}
              onChange={(e) =>
                setEditingRecord({ ...editingRecord, date: e.target.value })
              }
              className="bg-[#27272A] p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Category"
              value={editingRecord.category}
              onChange={(e) =>
                setEditingRecord({ ...editingRecord, category: e.target.value })
              }
              className="bg-[#27272A] p-2 rounded w-full"
            />
            <select
              value={editingRecord.status}
              onChange={(e) =>
                setEditingRecord({ ...editingRecord, status: e.target.value })
              }
              className="bg-[#27272A] p-2 rounded w-full"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:justify-end">
            <button
              onClick={handleUpdateRecord}
              className="bg-green-500 text-white px-4 py-2 rounded-md mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
            >
              Update
            </button>
            <button
              onClick={() => setEditingRecord(null)}
              className="bg-red-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      )} */}

      {/* Generate Reports Section */}
      <div className="mt-8 bg-black p-4 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Generate Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="date"
            placeholder="Start Date"
            value={reportCriteria.date}
            onChange={(e) =>
              setReportCriteria({
                ...reportCriteria,
                date: e.target.value,
              })
            }
            className="bg-[#27272A] p-2 rounded w-full"
          />
          {/* <input
            type="date"
            placeholder="End Date"
            value={reportCriteria.endDate}
            onChange={(e) =>
              setReportCriteria({ ...reportCriteria, endDate: e.target.value })
            }
            className="bg-[#27272A] p-2 rounded w-full"
          /> */}
          {/* <select
            value={reportCriteria.type}
            onChange={(e) =>
              setReportCriteria({ ...reportCriteria, type: e.target.value })
            }
            className="bg-[#27272A] p-2 rounded w-full"
          /> */}
        </div>
        <button
          onClick={handleGenerateReport}
          className="mt-4 bg-white text-black hover:bg-[#dedede] px-4 py-2 rounded-md w-full sm:w-auto"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default FinancialRecords;
