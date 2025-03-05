import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Profile from "./pages/Profile";
import Login from "./components/auth/Login";
import AppLayout from "./pages/AppLayout";
import Main from "./pages/Main";
import Contact from "./pages/Contact";
import TodoList from "./pages/TodoList";
import TodoComponent from "./components/TodoList/TodoComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ChakraProvider>
              <Login />
            </ChakraProvider>
          }
        />

        {/* Routes nécessitant le layout avec Navbar et Footer */}
        <Route path="/espace-eilco" element={<AppLayout />}>
          {/* Route par défaut */}
          <Route index element={<Main />} />
          {/* Autres pages accessibles via la Navbar */}
          <Route path="contacts" element={<Contact />} />
          {/* Vous pouvez ajouter d'autres routes ici */}
          <Route path="todos" element={<TodoList />} />
          <Route path="add-todo" element={<TodoComponent />} />
          <Route path="update-todo/:id" element={<TodoComponent />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
