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
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/auth/controll/protectedRoute";

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

        <Route path="/espace-eilco" element={<AppLayout />}>
          <Route index element={<Main />} />
          <Route path="contacts" element={<Contact />} />
          <Route path="todos" element={<TodoList />} />
          <Route path="add-todo" element={<TodoComponent />} />
          <Route path="update-todo/:id" element={<TodoComponent />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
          <Route path="/espace-admin" element={<AppLayout />}>
            {/* <Route index element={<Main />} /> */}
            <Route index element={<AdminPage />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
