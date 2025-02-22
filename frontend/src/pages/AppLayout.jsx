import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/NavBar";
import Footer from "../components/Footer/Footer";

function AppLayout() {
  const navbarHeight = 64;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flexGrow: 1, paddingTop: navbarHeight }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
