import React, { useState, useEffect } from "react";

export function AddSupplierModal({ isOpen, onClose, onSave, company }) {
  const [newCompany, setNewCompany] = useState({
    name: "",
    contactInfo: {
      email: "",
      phone: "",
    },
    status: "Active",
  });

  const handleSave = () => {
    onSave(newCompany);
    setNewCompany({
      name: "",
      contactInfo: {
        email: "",
        phone: "",
      },
      status: "Active",
    });
    onClose();
  };

  useEffect(() => {
    if (company !== undefined) {
      setNewCompany(company);
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#121212] p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">
          {company !== undefined ? "Update Supplier" : "Add New Supplier"}
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newCompany.name}
            onChange={(e) =>
              setNewCompany({ ...newCompany, name: e.target.value })
            }
            className="bg-[#27272A] p-2 rounded w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={newCompany.contactInfo.email}
            onChange={(e) =>
              setNewCompany({
                ...newCompany,
                contactInfo: {
                  ...newCompany.contactInfo,
                  email: e.target.value,
                },
              })
            }
            className="bg-[#27272A] p-2 rounded w-full"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={newCompany.contactInfo.phone}
            onChange={(e) =>
              setNewCompany({
                ...newCompany,
                contactInfo: {
                  ...newCompany.contactInfo,
                  phone: e.target.value,
                },
              })
            }
            className="bg-[#27272A] p-2 rounded w-full"
          />
          <select
            value={newCompany.status}
            onChange={(e) =>
              setNewCompany({ ...newCompany, status: e.target.value })
            }
            className="bg-[#27272A] p-2 rounded w-full"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
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
