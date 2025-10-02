import React, { useState } from "react";
import CreateTaskForm from "../../components/CreateTaskForm";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">React.js</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700"
        >
          <span>📋</span>
          <span>Tasks</span>
        </button>
        <button className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
          <span>👤</span>
          <span>Profile</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700 mt-auto"
        >
          <span>🔒</span>
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <p className="text-gray-600">Welcome back, John Doe</p>
      </main>

      {/* Task Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <CreateTaskForm onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
