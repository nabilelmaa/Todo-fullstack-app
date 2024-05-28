"use client";

import React, { useEffect, useState } from "react";
import TodosCard from "./TodosCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";

enum TaskStatus {
  INCOMPLETE = "INCOMPLETE",
  IN_PROGRESS = "IN PROGRESS",
  COMPLETED = "COMPLETED",
}

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: TaskStatus;
}

const TodosList: React.FC = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        const response = await fetch("/api/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setTodos(data.tasks);
        } else {
          console.error("Error fetching todos:", data.message);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const deleteTask = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`/api/todos/${id}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo.id !== id));
      } else {
        const data = await response.json();
        console.error("Error deleting task:", data.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateStatus = async (id: string, status: TaskStatus) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`/api/todos/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setTodos(
          todos.map((todo) => (todo.id === id ? { ...todo, status } : todo))
        );
      } else {
        const data = await response.json();
        console.error("Error updating task status:", data.message);
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const updateTaskDetails = async (id: string, updatedTask: Task) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`/api/todos/${id}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        setTodos(todos.map((todo) => (todo.id === id ? updatedTask : todo)));
      } else {
        const data = await response.json();
        console.error("Error updating task details:", data.message);
      }
    } catch (error) {
      console.error("Error updating task details:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Todos</h1>
      {loading ? (
        <div>
          <Skeleton count={1} height={300} width={300}className="mb-4" />
        </div>
      ) : todos.length === 0 ? (
        <div className="flex flex-col justify-center items-center mt-24">
          <p className="text-xl font-semibold text-center mb-4">
            Seems you've nothing to do. Go and have some rest!
          </p>
          <Image
            src="/panda-sleeping.png"
            alt="panda sleeping"
            width={250}
            height={100}
          />
        </div>
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodosCard
              key={todo.id}
              todo={todo}
              onDelete={deleteTask}
              onUpdateStatus={updateStatus}
              onUpdateDetails={updateTaskDetails}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodosList;
