import React, { useEffect } from "react";
import { useState } from "react";
import { getTodo, saveTodo, updateTodo } from "../../services/TodoService";
import { useNavigate, useParams } from "react-router-dom";

const TodoComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  function saveOrUpdateTodo(e) {
    e.preventDefault();

    const todo = { title, description, completed };
    //     console.log(todo);

    if (id) {
      updateTodo(id, todo)
        .then((response) => {
          navigate("/espace-eilco/todos");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      saveTodo(todo)
        .then((response) => {
          console.log(response.data);
          navigate("/espace-eilco/todos");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function pageTitle() {
    if (id) {
      return (
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Update Todo
        </h2>
      );
    } else {
      return (
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add Todo
        </h2>
      );
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        {pageTitle()}
        <form className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Todo Title:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter Todo Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Todo Description:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter Todo Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Todo Completed:
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={completed}
              onChange={(e) => setCompleted(e.target.value === "true")}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            onClick={(e) => saveOrUpdateTodo(e)}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoComponent;
