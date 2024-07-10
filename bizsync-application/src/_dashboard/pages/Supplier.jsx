import React from "react";

const Supplier = () => {
  // Sample data for the supplier details
  const supplierData = [
    {
      name: "ABC Corporation",
      email: "contact@abccorp.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
    },
    {
      name: "XYZ Suppliers",
      email: "info@xyzsuppliers.com",
      phone: "+1 (555) 987-6543",
      status: "Inactive",
    },
    {
      name: "Global Distributors",
      email: "sales@globaldist.com",
      phone: "+1 (555) 246-8135",
      status: "Active",
    },
  ];

  return (
    <div className="md:w-full w-screen bg-[#121212] text-white p-4">
      <div className="bg-none p-4 flex justify-end items-center gap-4">
        <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200">
          Add new supplier
        </button>
      </div>
      <div className="bg-black rounded-md border border-[#27272A] p-4">
        <h3 className="text-xl font-semibold mb-2">Supplier Details</h3>
        <p className="text-gray-400 mb-4">
          List of all suppliers and their information
        </p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-2 pr-6 whitespace-nowrap">Name</th>
                <th className="pb-2 pr-6 whitespace-nowrap">Email</th>
                <th className="pb-2 pr-6 whitespace-nowrap">Phone</th>
                <th className="pb-2 pr-6 whitespace-nowrap">Status</th>
                <th className="pb-2 whitespace-nowrap">Edit</th>
              </tr>
            </thead>
            <tbody>
              {supplierData.map((supplier, index) => (
                <tr
                  key={index}
                  className="bg-black hover:bg-[#27272A] transition-all"
                >
                  <td className="py-2 pr-6 whitespace-nowrap">
                    {supplier.name}
                  </td>
                  <td className="py-2 pr-6 whitespace-nowrap">
                    {supplier.email}
                  </td>
                  <td className="py-2 pr-6 whitespace-nowrap">
                    {supplier.phone}
                  </td>
                  <td
                    className={`py-2 pr-6 whitespace-nowrap ${
                      supplier.status.toLowerCase() === "active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {supplier.status}
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

export default Supplier;
