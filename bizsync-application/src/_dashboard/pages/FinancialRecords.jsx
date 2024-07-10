import React, { useState } from "react";
import { AddRecordModal } from "../../components/AddRecordModal";

const FinancialRecords = () => {
  const [records, setRecords] = useState([
    {
      id: 1,
      type: "Income",
      amount: 5000,
      date: "2024-07-01",
      category: "Salary",
      status: "Completed",
    },
    {
      id: 2,
      type: "Expense",
      amount: 1000,
      date: "2024-07-05",
      category: "Rent",
      status: "Pending",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecord, setNewRecord] = useState({
    type: "Income",
    amount: "",
    date: "",
    category: "",
    status: "Pending",
  });

  const [editingRecord, setEditingRecord] = useState(null);

  const [reportCriteria, setReportCriteria] = useState({
    startDate: "",
    endDate: "",
    type: "All",
  });

  const handleAddRecord = () => {
    setRecords([...records, { ...newRecord, id: records.length + 1 }]);
    setNewRecord({
      type: "Income",
      amount: "",
      date: "",
      category: "",
      status: "Pending",
    });
    setShowAddForm(false);
  };
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // ... other state variables

  // const handleAddRecord = (newRecord) => {
  //   // Logic to add the new record
  //   setRecords([...records, { ...newRecord, id: Date.now() }]);
  // };

  const handleEditRecord = (id) => {
    const recordToEdit = records.find((record) => record.id === id);
    setEditingRecord(recordToEdit);
  };

  const handleUpdateRecord = () => {
    setRecords(
      records.map((record) =>
        record.id === editingRecord.id ? editingRecord : record
      )
    );
    setEditingRecord(null);
  };

  const handleGenerateReport = () => {
    // Placeholder for report generation logic
    console.log("Generating report with criteria:", reportCriteria);
  };

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
                    onClick={() => handleEditRecord(record.id)}
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
      {editingRecord && (
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
      )}

      {/* Generate Reports Section */}
      <div className="mt-8 bg-black p-4 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Generate Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            className="bg-[#27272A] p-2 rounded w-full"
          />
          <input
            type="date"
            placeholder="End Date"
            value={reportCriteria.endDate}
            onChange={(e) =>
              setReportCriteria({ ...reportCriteria, endDate: e.target.value })
            }
            className="bg-[#27272A] p-2 rounded w-full"
          />
          <select
            value={reportCriteria.type}
            onChange={(e) =>
              setReportCriteria({ ...reportCriteria, type: e.target.value })
            }
            className="bg-[#27272A] p-2 rounded w-full"
          />
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
