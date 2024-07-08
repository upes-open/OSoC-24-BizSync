import React from "react";

const Notifications = () => {
  return (
    <div className="w-full min-h-screen bg-[#121212] text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      <div className="bg-black rounded-lg border border-gray-800 p-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-xl font-semibold mb-2">
            You have no notifications
          </h2>
          <p className="text-gray-400 text-center mb-6">
            You can start receiving critical notification as you set one up
          </p>
          <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200">
            Add Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
