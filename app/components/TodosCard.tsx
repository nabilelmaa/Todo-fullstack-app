"use client";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaPenToSquare } from "react-icons/fa6";
import Alert from "@mui/material/Alert";
import { LuSubtitles } from "react-icons/lu";
import { TbFileDescription, TbCalendarDue } from "react-icons/tb";
import { GrStatusGood } from "react-icons/gr";

enum TaskStatus {
  INCOMPLETE = "INCOMPLETE",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: TaskStatus;
}

interface TodosCardProps {
  todo: Task;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: TaskStatus) => void;
  onUpdateDetails: (id: string, updatedTask: Task) => void;
}

const TodosCard: React.FC<TodosCardProps> = ({
  todo,
  onDelete,
  onUpdateStatus,
  onUpdateDetails,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editTask, setEditTask] = useState<Task>(todo);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);

  const handleDelete = (id: string) => {
    onDelete(id);
    setShowDeleteAlert(true);
    setTimeout(() => {
      setShowDeleteAlert(false);
    }, 1000);
  };

  const handleUpdateDetails = () => {
    setShowUpdateAlert(true);
    setTimeout(() => {
      setShowUpdateAlert(false);
    }, 1000);
    onUpdateDetails(todo.id, editTask);
    setEditMode(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditTask({
      ...editTask,
      [name]: value,
    });
  };

  return (
    <div className="group">
      <li className="mb-8 p-6 border rounded-lg shadow-md bg-white max-w-md mx-auto">
        {editMode ? (
          <div>
            <input
              type="text"
              name="title"
              value={editTask.title}
              onChange={handleChange}
              className="mb-4 p-2 border rounded w-full focus:outline-none focus:border-blue-500"
            />
            <textarea
              name="description"
              value={editTask.description || ""}
              onChange={handleChange}
              className="mb-4 p-2 border rounded w-full h-24 resize-none focus:outline-none focus:border-blue-500"
            />
            <input
              type="date"
              name="dueDate"
              value={
                editTask.dueDate
                  ? new Date(editTask.dueDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className="mb-4 p-2 border rounded w-full focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setEditMode(false);
                  setEditTask(todo);
                }}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-300 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateDetails}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <LuSubtitles className="mr-2" />
              {todo.title}
            </h2>
            <p className="mb-4 flex items-center">
              <TbFileDescription className="mr-3" />
              {todo.description}
            </p>
            <p className="mb-4 flex items-center">
              <TbCalendarDue className="mr-3" />
              {todo.dueDate
                ? new Date(todo.dueDate).toLocaleDateString()
                : "No due date"}
            </p>
            <p className="mb-4 flex items-center">
              <GrStatusGood className="mr-3" />
              <span
                className={`font-semibold ${
                  todo.status === TaskStatus.COMPLETED
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {todo.status}
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none flex items-center justify-start"
              >
                <MdDelete className="mr-2" />
                Delete
              </button>
              <button
                onClick={() => setEditMode(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none flex items-center justify-start"
              >
                <FaPenToSquare className="mr-2" />
                Edit
              </button>
              <button
                onClick={() => onUpdateStatus(todo.id, TaskStatus.COMPLETED)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full focus:outline-none flex items-center justify-start"
              >
                <AiOutlineFileDone className="mr-2" />
                Mark as Completed
              </button>
            </div>
            {showDeleteAlert && (
              <Alert severity="error">Todo was deleted!</Alert>
            )}
            {showUpdateAlert && (
              <Alert severity="success">Todo was updated!</Alert>
            )}
          </div>
        )}
      </li>
    </div>
  );
};

export default TodosCard;
