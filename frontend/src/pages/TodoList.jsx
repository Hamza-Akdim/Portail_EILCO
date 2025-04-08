import React, { useEffect, useState } from "react";
import {
  completeTodo,
  deleteTodo,
  getAllTodos,
  inCompleteTodo,
} from "../utils/apiFunctions.js";
import { useNavigate } from "react-router-dom";

const ListTodoComponent = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    listTodos();
  }, []);

  function listTodos() {
    setLoading(true);
    setError(null);
    getAllTodos()
      .then((response) => {
        if (response && Array.isArray(response)) {
          setTodos(response);
        } else if (response && response.data && Array.isArray(response.data)) {
          setTodos(response.data);
        } else {
          setError("Invalid response format from server");
          setTodos([]);
        }
      })
      .catch(() => {
        setError("Failed to load todos. Please try again.");
        setTodos([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function addNewTodo() {
    navigate("/espace-eilco/add-todo");
  }

  function updateTodo(id) {
    navigate(`/espace-eilco/update-todo/${id}`);
  }

  function removeTodo(id) {
    deleteTodo(id)
      .then(() => listTodos())
      .catch(() => {
        setError("Failed to delete todo");
      });
  }

  function markCompleteTodo(id) {
    completeTodo(id)
      .then(() => listTodos())
      .catch(() => {
        setError("Failed to complete todo");
      });
  }

  function markInCompleteTodo(id) {
    inCompleteTodo(id)
      .then(() => listTodos())
      .catch(() => {
        setError("Failed to update todo status");
      });
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
        <button
          onClick={listTodos}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Liste des Tâches</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 block mx-auto"
        onClick={addNewTodo}
        aria-label="Ajouter une nouvelle tâche"
      >
        Ajouter une tâche
      </button>

      {todos.length === 0 ? (
        <div className="text-center text-gray-500 p-4">
          Aucune tâche trouvée. Ajoutez une nouvelle tâche pour commencer.
        </div>
      ) : (
        <>
          {/* Desktop view */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Titre
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Description
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Statut
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo) => (
                  <tr key={todo.id} className="even:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-4 text-sm text-gray-900">
                      {todo.title}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-sm text-gray-900">
                      {todo.description}
                    </td>
                    <td
                      className={`border border-gray-300 px-6 py-4 text-sm font-medium ${
                        todo.completed ? "text-green-600" : "text-red-600"
                      } uppercase`}
                    >
                      {todo.completed ? "Terminée" : "En attente"}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-sm">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => updateTodo(todo.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => removeTodo(todo.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Supprimer
                        </button>
                        {!todo.completed ? (
                          <button
                            onClick={() => markCompleteTodo(todo.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Terminer
                          </button>
                        ) : (
                          <button
                            onClick={() => markInCompleteTodo(todo.id)}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            Réouvrir
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card view */}
          <div className="md:hidden space-y-4">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
              >
                <h3 className="text-lg font-semibold mb-2">{todo.title}</h3>
                <p className="text-gray-600 mb-2">{todo.description}</p>
                <div
                  className={`text-sm font-medium mb-2 ${
                    todo.completed ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {todo.completed ? "Terminée" : "En attente"}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateTodo(todo.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Supprimer
                  </button>
                  {!todo.completed ? (
                    <button
                      onClick={() => markCompleteTodo(todo.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Terminer
                    </button>
                  ) : (
                    <button
                      onClick={() => markInCompleteTodo(todo.id)}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      Réouvrir
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListTodoComponent;
