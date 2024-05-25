"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosCreate } from "react-icons/io";
import Alert from "@mui/material/Alert";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("INCOMPLETE");
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const newTodo = {
      title,
      description,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      status,
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("/api/todos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTodo),
      });

      if (response.ok) {
        setShowSuccessAlert(true);
        setLoading(false);
        setTitle("");
        setDescription("");
        setDueDate("");
        setStatus("INCOMPLETE");
        setTimeout(() => {
          setShowSuccessAlert(false);
          router.push("/dashboard/my-todos");
        }, 1000);
      } else {
        setLoading(false);
        console.error("Failed to create todo");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error creating todo:", error);
    }
  };

  return (
    <div className="p-6 max-w-full border bg-white rounded-lg mt-12 mx-auto">
      <div className="flex items-center justify-center mb-4">
        <IoIosCreate className="mr-2 text-2xl" />
        <h1 className="text-2xl font-bold">Create a new Todo</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          >
            <option value="INCOMPLETE">Incomplete</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <span className="loading loading-spinner loading-sm mr-2"></span>
                Loading...
              </div>
            ) : (
              "Create Todo"
            )}
          </button>
          <div>
            {showSuccessAlert && (
              <Alert severity="success">Todo created successfully!</Alert>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;
