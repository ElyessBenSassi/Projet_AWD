import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav>
      <button onClick={() => navigate("/")}>List Orders</button>
      <button onClick={() => navigate("/create-order")}>Create Order</button>
    </nav>
  );
}

export default Navbar;
