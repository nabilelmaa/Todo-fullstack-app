"use client";

import React, { useEffect, useState } from "react";
import TodosCard from "./TodosCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: string;
}

const TodosList: React.FC = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        const data = await response.json();
        setTodos(data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const deleteTask = async (id: string) => {
    try {
      await fetch(`/api/todos/${id}/delete`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/todos/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, status } : todo))
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const updateTaskDetails = async (id: string, updatedTask: Task) => {
    try {
      await fetch(`/api/todos/${id}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      setTodos(todos.map((todo) => (todo.id === id ? updatedTask : todo)));
    } catch (error) {
      console.error("Error updating task details:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Todos</h1>
      {loading ? (
        <div>
          <Skeleton count={5} height={100} className="mb-4" />
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
