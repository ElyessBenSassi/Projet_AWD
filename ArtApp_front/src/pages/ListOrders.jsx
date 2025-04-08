import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

function ListOrders() {
  const [orders, setOrders] = useState([]);
  const [buyerId, setBuyerId] = useState("");
  const [statusUpdates, setStatusUpdates] = useState({});
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/orders/getAll");
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
    };
    getOrders();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`/orders/delete/${orderId}`);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleViewOrder = (orderId) => {
    navigate(`/order-detail/${orderId}`);
  };

  const handleEditOrder = (orderId) => {
    navigate(`/order-update/${orderId}`);
  };

  const handleFilterByBuyer = () => {
    if (buyerId) {
      navigate(`/orderByBuyer/${buyerId}`);
    } else {
      alert("Please enter a valid Buyer ID");
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setStatusUpdates({ ...statusUpdates, [orderId]: newStatus });
  };

  const handleUpdateStatus = async (orderId) => {
    try {
      const newStatus = statusUpdates[orderId];
      if (!newStatus) {
        alert("Please select a status before updating.");
        return;
      }

      const response = await axios.put(
        `http://localhost:8082/orders/updateStatus/${orderId}`,
        null,
        { params: { status: newStatus } }
      );

      // If the update is successful, refresh the orders
      if (response.status === 200) {
        const updatedOrders = await fetchOrders();
        setOrders(updatedOrders);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Delivered orders cannot be changed.");
      } else {
        console.error("Error updating status:", error);
        alert("There was an error updating the order status.");
      }
    }
  };

  return (
    <div>
      <h2>List of Orders</h2>

      {/* Filter by Buyer */}
      <div>
        <TextField
          label="Buyer ID"
          type="number"
          value={buyerId}
          onChange={(e) => setBuyerId(e.target.value)}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterByBuyer}
          style={{ marginLeft: "10px" }}
        >
          Filter by Buyer
        </Button>
      </div>

      <table
        style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Description</th>
            <th>Items</th>
            <th>Total Price</th>
            <th>Buyer ID</th>
            <th>Seller ID</th>
            <th>Status</th>
            <th>Change Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}
            >
              <td>{order.id}</td>
              <td>{order.orderDescription}</td>
              <td>{order.nbrItems}</td>
              <td>{order.totalPrice}</td>
              <td>{order.buyerId}</td>
              <td>{order.sellerId}</td>
              <td>{order.status}</td>
              <td>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusUpdates[order.id] || ""}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    label="Status"
                    size="small"
                  >
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="CONFIRMED">Confirmed</MenuItem>
                    <MenuItem value="SHIPPED">Shipped</MenuItem>
                    <MenuItem value="DELIVERED">Delivered</MenuItem>
                    <MenuItem value="CANCELLED">Cancelled</MenuItem>
                  </Select>
                  <Button
                    onClick={() => handleUpdateStatus(order.id)}
                    variant="outlined"
                    size="small"
                    style={{ marginTop: "5px" }}
                  >
                    Update Status
                  </Button>
                </FormControl>
              </td>
              <td>
                <Button
                  onClick={() => handleViewOrder(order.id)}
                  variant="contained"
                  size="small"
                >
                  View
                </Button>
                <Button
                  onClick={() => handleEditOrder(order.id)}
                  variant="outlined"
                  size="small"
                  style={{ margin: "0 5px" }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(order.id)}
                  variant="contained"
                  size="small"
                  color="error"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListOrders;
