import React, { useEffect, useState } from "react";
import CreateTaskForm from "../../components/CreateTaskForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Task {
  _id: string;
  title: string;
  description: string;
  date: string;
  status: "Pending" | "Completed";
}

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login", { replace: true });
  };

  const fetchData = async () => {
    try {
      const apiUrl = "http://localhost:3000/tasks/getTasks";

      const stored = localStorage.getItem("auth");
      const token = stored ? JSON.parse(stored).token : null;

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response);
      setTasks(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <main className="flex-1 p-6 flex flex-col">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <p className="text-gray-600 mb-4">Welcome back, John Doe</p>

        {/* Scrollable Task List */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid gap-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
                  onClick={() => {
                    setSelectedTask(task);
                    setIsModalOpen(true);
                  }}
                >
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-gray-600">{task.description}</p>
                    <p className="text-sm text-gray-500">
                      Due: {new Date(task.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No tasks available.</p>
            )}
          </div>
        </div>
      </main>

      {/* Task Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <CreateTaskForm
              task={selectedTask}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedTask(null);
              }}
              onTaskCreated={fetchData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
