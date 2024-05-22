import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaPenToSquare } from "react-icons/fa6";
import Alert from "@mui/material/Alert";
import { LuSubtitles } from "react-icons/lu";
import { TbFileDescription } from "react-icons/tb";
import { TbCalendarDue } from "react-icons/tb";
import { GrStatusGood } from "react-icons/gr";

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: string;
}

interface TodosCardProps {
  todo: Task;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: string) => void;
  onUpdateDetails: (id: string, updatedTask: Task) => void;
}

const TodosCard: React.FC<TodosCardProps> = ({
  todo,
  onDelete,
  onUpdateStatus,
  onUpdateDetails,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(todo);
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
    if (editTask) {
      setShowUpdateAlert(true);
      setTimeout(() => {
        setShowUpdateAlert(false);
      }, 1000);
      onUpdateDetails(todo.id, editTask);
      setEditMode(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (editTask) {
      setEditTask({
        ...editTask,
        [name]: value,
      });
    }
  };

  return (
    <div className="group">
      <li className="mb-4 p-4 border rounded-lg shadow-sm bg-whit max-w-lg">
        {editMode ? (
          <div>
            <input
              type="text"
              name="title"
              value={editTask?.title || ""}
              onChange={handleChange}
              className="mb-2 p-2 border rounded w-full"
            />
            <textarea
              name="description"
              value={editTask?.description || ""}
              onChange={handleChange}
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="date"
              name="dueDate"
              value={
                editTask?.dueDate
                  ? new Date(editTask.dueDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className="mb-2 p-2 border rounded w-full"
            />
            <button
              onClick={() => {
                setEditMode(false);
                setEditTask(todo);
              }}
              className="bg-black text-white p-2 rounded mr-2 w-[80px]"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateDetails}
              className="mr-2 bg-blue-500 text-white p-2 rounded w-[50px]"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <LuSubtitles className="mr-2" />
              Title: {todo.title}
            </h2>
            <p className="mb-2 max-w-lg flex items-center">
              <TbFileDescription className="mr-3" />
              <span className="font-semibold">Description: </span>
              {todo.description}
            </p>
            <p className="mb-2 flex items-center">
              <TbCalendarDue className="mr-3" />
              <span className="font-semibold">Due: </span>{" "}
              {todo.dueDate
                ? new Date(todo.dueDate).toLocaleDateString()
                : "No due date"}
            </p>
            <p
              className={`font-semibold${
                todo.status === "COMPLETED" ? "text-green-600" : "text-red-600"
              }`}
            >
              <div className="flex items-center">
                <GrStatusGood className="mr-3" />
                <span className="font-semibold">Status: </span>
                {todo.status}
              </div>
            </p>
            <div className="flex mt-8">
              <button
                onClick={() => handleDelete(todo.id)}
                className="mr-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded flex items-center"
              >
                <MdDelete className="mr-2" />
                Delete
              </button>
              <button
                onClick={() => onUpdateStatus(todo.id, "COMPLETED")}
                className="mr-2 bg-green-500 hover:bg-green-600 text-white p-2 rounded flex items-center"
              >
                <AiOutlineFileDone className="mr-2" />
                Mark as Completed
              </button>
              <button
                onClick={() => setEditMode(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded flex items-center"
              >
                <FaPenToSquare className="mr-2" />
                Edit
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
