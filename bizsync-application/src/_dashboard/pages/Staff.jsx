import React, { useState, useEffect } from "react";
import RolePopup from "../../components/RolePopup";
import { AddStaffModal } from "../../components/AddStaffModal";
import axios from "axios";

const Staff = () => {
  // ... (previous state declarations and functions)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [staffData, setStaffData] = useState([]);

  const handleAddStaff = async (newStaff) => {
    try {
      const response = await axios.post(
        "http://localhost:8001/api/v1/staff",
        {
          name: newStaff.name,
          contactInfo: newStaff.contactInfo,
          position: newStaff.position,
          roles: newStaff.roles,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyZWY3MzJhOThmZTliZTAyODM2ZGQiLCJlbWFpbCI6InByaXlhbnNodWJ1dG9sYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InByaXlhbnNodSIsIm9yZ2FuaXphdGlvbiI6InVwZXMiLCJpYXQiOjE3MjA5MDU2MzQsImV4cCI6MTAwMDAwMTcyMDkwNTYzNH0.ujV1UyQdSTRnK98H0a57Io_PaFrNbS3jDMzWF1bBlxE",
          },
        }
      );

      console.log(response.data.data);
      setStaffData([...staffData, response.data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const [selectedStaff, setSelectedStaff] = useState();

  const handleEditStaff = (staff) => {
    console.log(staff);
    setSelectedStaff(staff);
    setIsEditModalOpen(true);
  };

  const handleUpdateStaff = async (updatedStaff) => {
    try {
      const response = await axios.put(
        `http://localhost:8001/api/v1/staff/${selectedStaff._id}`,
        {
          name: updatedStaff.name,
          roles: updatedStaff.roles,
          poition: updatedStaff.position,
          contactInfo: updatedStaff.contactInfo,
          status: updatedStaff.status,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyZWY3MzJhOThmZTliZTAyODM2ZGQiLCJlbWFpbCI6InByaXlhbnNodWJ1dG9sYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InByaXlhbnNodSIsIm9yZ2FuaXphdGlvbiI6InVwZXMiLCJpYXQiOjE3MjA5MDU2MzQsImV4cCI6MTAwMDAwMTcyMDkwNTYzNH0.ujV1UyQdSTRnK98H0a57Io_PaFrNbS3jDMzWF1bBlxE",
          },
        }
      );

      console.log(response.data.data);
      getStaff();
    } catch (err) {
      console.log(err);
    }
  };
  const getStaff = async () => {
    try {
      const response = await axios.get("http://localhost:8001/api/v1/staff", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyZWY3MzJhOThmZTliZTAyODM2ZGQiLCJlbWFpbCI6InByaXlhbnNodWJ1dG9sYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InByaXlhbnNodSIsIm9yZ2FuaXphdGlvbiI6InVwZXMiLCJpYXQiOjE3MjA5MDU2MzQsImV4cCI6MTAwMDAwMTcyMDkwNTYzNH0.ujV1UyQdSTRnK98H0a57Io_PaFrNbS3jDMzWF1bBlxE",
        },
      });

      console.log(response.data.data);
      setStaffData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  return (
    <div className="lg:w-full w-screen bg-[#121212] text-white p-4">
      <div className="bg-none p-4 flex justify-end items-center gap-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
        >
          Add Staff
        </button>
      </div>
      <AddStaffModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddStaff}
      />

      <AddStaffModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateStaff}
        staff={selectedStaff}
      />
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
                  <td className="py-2 pr-6 whitespace-nowrap">
                    {staff.contactInfo.email}
                  </td>
                  <td className="py-2 pr-6 whitespace-nowrap">
                    {staff.contactInfo.phone}
                  </td>
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
                      {staff.roles.map((role) => `${role} `)}
                    </div>
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    <button
                      onClick={() => handleEditStaff(staff)}
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

export default Staff;
