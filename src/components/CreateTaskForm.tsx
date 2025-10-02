import React, { useState } from "react";
import Button from "./Button";

interface CreateTaskFormProps {
  onClose: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ title, desc, dueDate, status });

    onClose();
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Create/Edit Task</h2>

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
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border rounded p-2"
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button
          label="Cancel"
          onClick={onClose}
          className="w-full bg-gray-500 hover:bg-gray-600 focus:ring-gray-400"
        />
        <Button
          label="Save"
          onClick={onClose}
          className="w-full bg-green-500 hover:!bg-green-600"
        />
      </div>
    </form>
  );
};

export default CreateTaskForm;
