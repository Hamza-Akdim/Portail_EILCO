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
import Stagecomponent from "./components/Stage/Stagecomponent";
import NewsAdmin from "./components/News/NewsAdmin";
import ServicesPage from "./components/EilcoServices/ServicesPage";
import AddContactPage from "./pages/AddContactPage.jsx";
import ManageUsers from "./components/Admin/ManageUsers";

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
          <Route path="stages" element={<Stagecomponent />} />
          <Route path="services" element={<ServicesPage />} />
        </Route>

        <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
          <Route path="/espace-admin" element={<AppLayout />}>
            <Route index element={<Main />} />
            <Route path="addNews" element={<NewsAdmin />} />
            <Route path="add" element={<AdminPage />} />
            <Route path="manage" element={<ManageUsers />} />
            <Route path="profile" element={<Profile />} />
            <Route path="news-admin" element={<NewsAdmin />} />
            <Route path="add-contact" element={<AddContactPage />} />
            <Route path="services" element={<ServicesPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute requiredRole="EDITEUR" />}>
          <Route path="/espace-editeur" element={<AppLayout />}>
            <Route index element={<Main />} />
            <Route path="addNews" element={<NewsAdmin />} />
            {/* <Route path="add" element={<AdminPage />} /> */}
            {/* <Route path="manage" element={<ManageUsers />} /> */}
            <Route path="profile" element={<Profile />} />
            <Route path="news-admin" element={<NewsAdmin />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="add-contact" element={<AddContactPage />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
