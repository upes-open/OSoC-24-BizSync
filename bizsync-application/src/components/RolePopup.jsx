import React, { useState } from "react";

const RolePopup = ({ staff, onClose, onSave }) => {
  const [selectedRoles, setSelectedRoles] = useState(staff.roles);
  const allRoles = ["Admin", "Sales", "Support", "HR", "IT"];

  const handleRoleToggle = (role) => {
    setSelectedRoles((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((r) => r !== role)
        : [...prevRoles, role]
    );
  };

  const handleSave = () => {
    onSave(staff.id, selectedRoles);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#121212] p-6 rounded-lg w-96">
        <h3 className="text-xl font-semibold mb-4">
          Manage Roles: {staff.name}
        </h3>
        <div className="mb-4">
          {allRoles.map((role) => (
            <label key={role} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedRoles.includes(role)}
                onChange={() => handleRoleToggle(role)}
                className="mr-2"
              />
              {role}
            </label>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RolePopup;
