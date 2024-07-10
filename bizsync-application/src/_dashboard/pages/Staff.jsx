import React, { useState } from "react";
import RolePopup from "../../components/RolePopup";

const Staff = () => {
  // ... (previous state declarations and functions)
  const [staffData, setStaffData] = useState([
    {
      id: 1,
      name: "John Doe",
      position: "Manager",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      roles: ["Admin", "Sales"],
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Sales Representative",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      status: "On Leave",
      roles: ["Sales"],
    },
    {
      id: 3,
      name: "Bob Johnson",
      position: "Technician",
      email: "bob.johnson@example.com",
      phone: "+1 (555) 246-8135",
      status: "Active",
      roles: ["Support"],
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    status: "Active",
    roles: [],
  });

  const handleAddStaff = () => {
    setStaffData([...staffData, { ...newStaff, id: staffData.length + 1 }]);
    setNewStaff({
      name: "",
      position: "",
      email: "",
      phone: "",
      status: "Active",
      roles: [],
    });
    setShowAddForm(false);
  };

  const handleEditStaff = (id) => {
    // Placeholder for edit functionality
    console.log("Editing staff with id:", id);
  };

  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleOpenRolePopup = (staff) => {
    setSelectedStaff(staff);
  };

  const handleCloseRolePopup = () => {
    setSelectedStaff(null);
  };

  const handleSaveRoles = (staffId, newRoles) => {
    setStaffData(
      staffData.map((staff) =>
        staff.id === staffId ? { ...staff, roles: newRoles } : staff
      )
    );
  };

  return (
    <div className="lg:w-full w-screen bg-[#121212] text-white p-4">
      <div className="bg-none p-4 flex justify-end items-center gap-4">
        <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200">
          Add new supplier
        </button>
      </div>
      <div className="bg-black rounded-md border border-[#27272A] p-4">
        <h3 className="text-xl font-semibold mb-2">Staff List</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-2 pr-6 whitespace-nowrap">Name</th>
                <th className="pb-2 pr-6 whitespace-nowrap">Position</th>
                <th className="pb-2 pr-6 whitespace-nowrap">Email</th>
                <th className="pb-2 pr-6 whitespace-nowrap">Phone</th>
                <th className="pb-2 pr-6 whitespace-nowrap">Status</th>
                <th className="pb-2 pr-6 whitespace-nowrap">Roles</th>
                <th className="pb-2 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffData.map((staff) => (
                <tr
                  key={staff.id}
                  className="bg-black hover:bg-[#27272A] transition-all"
                >
                  <td className="py-2 pr-6 whitespace-nowrap">{staff.name}</td>
                  <td className="py-2 pr-6 whitespace-nowrap">
                    {staff.position}
                  </td>
                  <td className="py-2 pr-6 whitespace-nowrap">{staff.email}</td>
                  <td className="py-2 pr-6 whitespace-nowrap">{staff.phone}</td>
                  <td
                    className={`py-2 pr-6 whitespace-nowrap ${
                      staff.status.toLowerCase() === "active"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {staff.status}
                  </td>
                  <td className="py-2 pr-6">
                    <div className="">
                      <button
                        onClick={() => handleOpenRolePopup(staff)}
                        className="text-blue-500 hover:text-blue-400 text-sm"
                      >
                        Manage Roles
                      </button>
                    </div>
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    <button
                      onClick={() => handleEditStaff(staff.id)}
                      className="text-blue-500 hover:text-blue-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedStaff && (
        <RolePopup
          staff={selectedStaff}
          onClose={handleCloseRolePopup}
          onSave={handleSaveRoles}
        />
      )}
    </div>
  );
};

export default Staff;
