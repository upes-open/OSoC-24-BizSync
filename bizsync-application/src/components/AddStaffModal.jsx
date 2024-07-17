import React, { useState, useEffect } from "react";

export function AddStaffModal({ isOpen, onClose, onSave, staff }) {
  const [newStaff, setNewStaff] = useState({
    name: "",
    position: "",
    contactInfo: {
      email: "",
      phone: "",
    },
    status: "Active",
    roles: [],
  });

  const handleSave = () => {
    onSave(newStaff);
    setNewStaff({
      name: "",
      position: "",
      contactInfo: {
        email: "",
        phone: "",
      },
      status: "Active",
      roles: [],
    });
    onClose();
  };

  useEffect(() => {
    // console.log(staff);
    if (staff !== undefined) {
      setNewStaff(staff);
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#121212] p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">
          {staff !== undefined ? "Update Staff" : "Add New Staff"}
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newStaff.name}
            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
            className="bg-[#27272A] p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Position"
            value={newStaff.position}
            onChange={(e) =>
              setNewStaff({ ...newStaff, position: e.target.value })
            }
            className="bg-[#27272A] p-2 rounded w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={newStaff.contactInfo.email}
            onChange={(e) =>
              setNewStaff({
                ...newStaff,
                contactInfo: { ...newStaff.contactInfo, email: e.target.value },
              })
            }
            className="bg-[#27272A] p-2 rounded w-full"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={newStaff.contactInfo.phone}
            onChange={(e) =>
              setNewStaff({
                ...newStaff,
                contactInfo: { ...newStaff.contactInfo, phone: e.target.value },
              })
            }
            className="bg-[#27272A] p-2 rounded w-full"
          />
          <select
            value={newStaff.status}
            onChange={(e) =>
              setNewStaff({ ...newStaff, status: e.target.value })
            }
            className="bg-[#27272A] p-2 rounded w-full"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div>
            <p className="mb-2">Roles:</p>
            <div className="flex flex-wrap gap-2">
              {["Admin", "Sales", "Support", "HR"].map((role) => (
                <label key={role} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newStaff.roles.includes(role)}
                    onChange={(e) => {
                      const updatedRoles = e.target.checked
                        ? [...newStaff.roles, role]
                        : newStaff.roles.filter((r) => r !== role);
                      setNewStaff({ ...newStaff, roles: updatedRoles });
                    }}
                    className="form-checkbox"
                  />
                  <span>{role}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-6 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-white text-black px-8 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
