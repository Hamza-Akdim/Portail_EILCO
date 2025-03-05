import "./App.css";
import Login from "./components/auth/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import { ChakraProvider } from "@chakra-ui/react";
import Profile from "./pages/Profile";

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
            
        <Route 
          path="/espace-eilco" 
          element={
              <AppLayout />
           } 
        />

        <Route 
          path="/profile" 
          element={
              <Profile />
           } 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
