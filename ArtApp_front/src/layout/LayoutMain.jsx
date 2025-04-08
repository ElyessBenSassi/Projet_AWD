import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function LayoutMain() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default LayoutMain;
