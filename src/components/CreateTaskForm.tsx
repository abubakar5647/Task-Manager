import React, { useState } from "react";
import Button from "./Button";
import axios from "axios";
interface Task {
  _id: string;
  title: string;
  description: string;
  date: string;
  status: "Pending" | "Completed";
}
interface CreateTaskFormProps {
  task?: Task | null;
  onClose: () => void;
  onTaskCreated: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  task,
  onClose,
  onTaskCreated,
}) => {
  const [title, setTitle] = useState(task?.title || "");
  const [desc, setDesc] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.date || "");
  const [status, setStatus] = useState(task?.status || "Pending");
  const [isLoading, setIsLoading] = useState(false);

  const stored = localStorage.getItem("auth");
  const token = stored ? JSON.parse(stored).token : null;

  const handleSave = async () => {
    try {
      setIsLoading(true);

      if (task) {
        // 👉 Update task
        await axios.put(
          `http://localhost:3000/tasks/updateTask/${task._id}`,
          { title, description: desc, date: dueDate, status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Task updated successfully ✅");
      } else {
        // 👉 Create new task
        await axios.post(
          "http://localhost:3000/tasks/addTask",
          { title, description: desc, date: dueDate, status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Task created successfully ✅");
      }

      onTaskCreated();
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!task) return;
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://localhost:3000/tasks/deleteTask/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Task deleted successfully ❌");
      onTaskCreated();
      onClose();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">
        {" "}
        {task ? "Edit Task" : "Create Task"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded p-2"
        required
      />

      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full border rounded p-2"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full border rounded p-2"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as "Pending" | "Completed")}
        className="w-full border rounded p-2"
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Action Buttons */}
      <div className="flex justify-between space-x-2">
        <Button
          label="Cancel"
          onClick={onClose}
          className="w-full bg-gray-500 hover:bg-gray-600"
        />
        {task && (
          <Button
            label="Delete"
            onClick={handleDelete}
            className="w-full bg-red-500 hover:bg-red-600"
          />
        )}
        <Button
          label={isLoading ? "Saving..." : task ? "Update" : "Save"}
          onClick={handleSave}
          className="w-full bg-green-500 hover:bg-green-600"
        />
      </div>
    </form>
  );
};

export default CreateTaskForm;
