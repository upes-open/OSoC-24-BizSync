import React from "react";

const DetailedInventory = () => {
  const itemDetailsData = [
    {
      item: "xyz item",
      reorderLevel: 12243,
      status: "Adequate",
      quantity: 9323,
    },
    { item: "xyz item", reorderLevel: 12243, status: "Low", quantity: 232 },
    {
      item: "xyz item",
      reorderLevel: 12243,
      status: "Adequate",
      quantity: 23232,
    },
  ];

  return (
    <div className="md:w-full w-screen bg-[#121212] text-white p-4">
      <div className="bg-none p-4 flex justify-end items-center gap-4">
        <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200">
          Add new item
        </button>
      </div>
      <div className="bg-black rounded-md border border-[#27272A] p-4">
        <h3 className="text-xl font-semibold mb-2">Item Details</h3>
        <p className="text-gray-400 mb-4">Detailed analytics of you items</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-2 pr-6 whitespace-nowrap">Item</th>
                <th className="pb-2 pr-6 whitespace-nowrap">Reorder level</th>
                <th className="pb-2 pr-6 whitespace-nowrap">Status</th>
                <th className="pb-2 pr-6 whitespace-nowrap">Quantity</th>
                <th className="pb-2 whitespace-nowrap">Edit</th>
              </tr>
            </thead>
            <tbody>
              {itemDetailsData.map((item, index) => (
                <tr
                  key={index}
                  className="bg-black hover:bg-[#27272A] transition-all"
                >
                  <td className="py-2 pr-6 whitespace-nowrap">{item.item}</td>
                  <td className="py-2 pr-6 whitespace-nowrap">
                    {item.reorderLevel}
                  </td>
                  <td
                    className={`py-2 pr-6 whitespace-nowrap ${
                      item.status.toLowerCase() === "low" ? "text-red-500" : ""
                    }`}
                  >
                    {item.status}
                  </td>
                  <td
                    className={`py-2 pr-6 whitespace-nowrap ${
                      item.status.toLowerCase() === "low" ? "text-red-500" : ""
                    }`}
                  >
                    {item.quantity}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    <button className="text-blue-500 hover:text-blue-400">
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
    </div>
  );
};

export default DetailedInventory;
