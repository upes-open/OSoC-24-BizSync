import React, { useState, useEffect } from "react";
import { AddSupplierModal } from "../../components/AddSupplierModal";
import axios from "axios";

const Supplier = () => {
  // Sample data for the supplier details
  const [selectedSupplier, setSelectedSupplier] = useState();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [supplierData, setSupplierData] = useState([]);

  const handleEditSupplier = async (supplier) => {
    setSelectedSupplier(supplier);
    console.log(selectedSupplier);
    setIsEditModalOpen(true);
  };

  const handleUpdateSupplier = async (updatedSupplier) => {
    try {
      const response = await axios.put(
        `http://localhost:8001/api/v1/suppliers/${selectedSupplier._id}`,
        {
          name: updatedSupplier.name,
          contactInfo: updatedSupplier.contactInfo,
          status: updatedSupplier.status,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyZWY3MzJhOThmZTliZTAyODM2ZGQiLCJlbWFpbCI6InByaXlhbnNodWJ1dG9sYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InByaXlhbnNodSIsIm9yZ2FuaXphdGlvbiI6InVwZXMiLCJpYXQiOjE3MjA5MDU2MzQsImV4cCI6MTAwMDAwMTcyMDkwNTYzNH0.ujV1UyQdSTRnK98H0a57Io_PaFrNbS3jDMzWF1bBlxE",
          },
        }
      );

      console.log(response.data.data);
      getSupplier();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddSupplier = async (supplier) => {
    try {
      const response = await axios.post(
        "http://localhost:8001/api/v1/suppliers",
        {
          name: supplier.name,
          contactInfo: supplier.contactInfo,
          status: supplier.status,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyZWY3MzJhOThmZTliZTAyODM2ZGQiLCJlbWFpbCI6InByaXlhbnNodWJ1dG9sYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InByaXlhbnNodSIsIm9yZ2FuaXphdGlvbiI6InVwZXMiLCJpYXQiOjE3MjA5MDU2MzQsImV4cCI6MTAwMDAwMTcyMDkwNTYzNH0.ujV1UyQdSTRnK98H0a57Io_PaFrNbS3jDMzWF1bBlxE",
          },
        }
      );

      console.log(response.data.data);
      setSupplierData([...supplierData, response.data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const getSupplier = async (supplier) => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/v1/suppliers",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyZWY3MzJhOThmZTliZTAyODM2ZGQiLCJlbWFpbCI6InByaXlhbnNodWJ1dG9sYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InByaXlhbnNodSIsIm9yZ2FuaXphdGlvbiI6InVwZXMiLCJpYXQiOjE3MjA5MDU2MzQsImV4cCI6MTAwMDAwMTcyMDkwNTYzNH0.ujV1UyQdSTRnK98H0a57Io_PaFrNbS3jDMzWF1bBlxE",
          },
        }
      );

      console.log(response.data.data);
      setSupplierData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSupplier();
  }, []);

  return (
    <div className="md:w-full w-screen bg-[#121212] text-white p-4">
      <div className="bg-none p-4 flex justify-end items-center gap-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
        >
          Add supplier
        </button>
      </div>
      <AddSupplierModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddSupplier}
      />

      <AddSupplierModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateSupplier}
        company={selectedSupplier}
      />
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
                    {supplier.contactInfo.email}
                  </td>
                  <td className="py-2 pr-6 whitespace-nowrap">
                    {supplier.contactInfo.phone}
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
                    <button
                      onClick={() => handleEditSupplier(supplier)}
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
    </div>
  );
};

export default Supplier;
