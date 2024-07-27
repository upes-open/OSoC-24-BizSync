import React, { useState, useEffect } from "react";
export function AddItemModal({ isOpen, onClose, onSave, item }) {
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    reorderLevel: "",
    status: "",
  });

  const handleSave = () => {
    onSave(newItem);
    setNewItem({
      name: "",
      quantity: "",
      reorderLevel: "",
      status: "",
    });
    onClose();
  };

  useEffect(() => {
    if (item !== undefined) {
      setNewItem(item);
      console.log(newItem);
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#121212] p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Add New Item</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="bg-[#27272A] p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: e.target.value })
            }
            className="bg-[#27272A] p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Reorder Level"
            value={newItem.reorderLevel}
            onChange={(e) =>
              setNewItem({ ...newItem, reorderLevel: e.target.value })
            }
            className="bg-[#27272A] p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Status"
            value={newItem.status}
            onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
            className="bg-[#27272A] p-2 rounded w-full"
          />
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
