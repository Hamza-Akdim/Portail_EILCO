import React, { useEffect, useState } from "react";
import {
  completeTodo,
  deleteTodo,
  getAllTodos,
  inCompleteTodo,
} from "../services/TodoService";
import { useNavigate } from "react-router-dom";

const ListTodoComponent = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listTodos();
  }, []);

  function listTodos() {
    getAllTodos()
        .then((response) => {
          setTodos(response.data);
        })
        .catch((error) => {
          console.error(error);
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
        .catch((error) => console.error(error));
  }

  function markCompleteTodo(id) {
    completeTodo(id)
        .then(() => listTodos())
        .catch((error) => console.error(error));
  }

  function markInCompleteTodo(id) {
    inCompleteTodo(id)
        .then(() => listTodos())
        .catch((error) => console.error(error));
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

        {/* Vue desktop/tableau */}
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
                    <div className="flex space-x-2">
                      <button
                          className="px-4 py-2 text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-600"
                          onClick={() => updateTodo(todo.id)}
                          aria-label={`Modifier la tâche ${todo.title}`}
                      >
                        Modifier
                      </button>
                      <button
                          className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
                          onClick={() => removeTodo(todo.id)}
                          aria-label={`Supprimer la tâche ${todo.title}`}
                      >
                        Supprimer
                      </button>
                      <button
                          className="px-4 py-2 text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600"
                          onClick={() => markCompleteTodo(todo.id)}
                          aria-label={`Marquer la tâche ${todo.title} comme terminée`}
                      >
                        Marquer terminée
                      </button>
                      <button
                          className="px-4 py-2 text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-600"
                          onClick={() => markInCompleteTodo(todo.id)}
                          aria-label={`Marquer la tâche ${todo.title} comme en attente`}
                      >
                        Marquer en attente
                      </button>
                    </div>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        {/* Vue mobile/cartes */}
        <div className="md:hidden space-y-4">
          {todos.map((todo) => (
              <div
                  key={todo.id}
                  className="bg-white shadow rounded-lg p-4 border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {todo.title}
                  </h3>
                  <span
                      className={`text-sm font-medium uppercase ${
                          todo.completed ? "text-green-600" : "text-red-600"
                      }`}
                  >
                {todo.completed ? "Terminée" : "En attente"}
              </span>
                </div>
                <p className="text-sm text-gray-700 mb-4">{todo.description}</p>
                <div className="flex flex-wrap gap-2">
                  <button
                      onClick={() => updateTodo(todo.id)}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded"
                      aria-label={`Modifier la tâche ${todo.title}`}
                  >
                    Modifier la tâche
                  </button>
                  <button
                      onClick={() => removeTodo(todo.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      aria-label={`Supprimer la tâche ${todo.title}`}
                  >
                    Supprimer
                  </button>
                  <button
                      onClick={() => markCompleteTodo(todo.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      aria-label={`Marquer la tâche ${todo.title} comme terminée`}
                  >
                    Marquer terminée
                  </button>
                  <button
                      onClick={() => markInCompleteTodo(todo.id)}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded"
                      aria-label={`Marquer la tâche ${todo.title} comme en attente`}
                  >
                    Marquer en attente
                  </button>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default ListTodoComponent;
