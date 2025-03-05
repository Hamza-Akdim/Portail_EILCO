import React, { useEffect, useState } from "react";
import { getTodo, saveTodo, updateTodo } from "../../services/TodoService";
import { useNavigate, useParams } from "react-router-dom";

const TodoComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  // Si un id est présent, on charge la tâche et on pré-remplit le formulaire
  useEffect(() => {
    if (id) {
      getTodo(id)
          .then((response) => {
            setTitle(response.data.title);
            setDescription(response.data.description);
            setCompleted(response.data.completed);
          })
          .catch((error) => console.error(error));
    }
  }, [id]);

  const saveOrUpdateTodo = (e) => {
    e.preventDefault();

    // Validation des champs requis
    const validationErrors = {};
    if (!title.trim()) {
      validationErrors.title = "Le titre est requis.";
    }
    if (!description.trim()) {
      validationErrors.description = "La description est requise.";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const todo = { title, description, completed };

    if (id) {
      updateTodo(id, todo)
          .then(() => navigate("/espace-eilco/todos"))
          .catch((error) => console.error(error));
    } else {
      saveTodo(todo)
          .then(() => navigate("/espace-eilco/todos"))
          .catch((error) => console.error(error));
    }
  };

  const pageTitle = () => {
    return (
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {id ? "Modifier la tâche" : "Ajouter une tâche"}
        </h2>
    );
  };

  return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          {pageTitle()}
          <form className="space-y-4" onSubmit={saveOrUpdateTodo} noValidate>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Titre de la tâche:
              </label>
              <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Entrez le titre de la tâche"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
              />
              {errors.title && (
                  <span className="text-red-500 text-sm">{errors.title}</span>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description de la tâche:
              </label>
              <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Entrez la description de la tâche"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
              />
              {errors.description && (
                  <span className="text-red-500 text-sm">{errors.description}</span>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Tâche terminée:
              </label>
              <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={completed ? "true" : "false"}
                  onChange={(e) => setCompleted(e.target.value === "true")}
              >
                <option value="false">Non</option>
                <option value="true">Oui</option>
              </select>
            </div>

            <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {id ? "Enregistrer les modifications" : "Créer la tâche"}
            </button>
          </form>
        </div>
      </div>
  );
};

export default TodoComponent;
