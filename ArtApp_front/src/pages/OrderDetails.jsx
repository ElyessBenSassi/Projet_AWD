import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, CircularProgress } from "@mui/material";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `/orders/getById/${orderId}`
        );
        setOrder(response.data);
      } catch (err) {
        setError("Error fetching order details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const handleEdit = () => {
    navigate(`/order-update/${orderId}`);
  };

  // Render the order details
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <Typography variant="h6" gutterBottom>
        Order ID: {order.id}
      </Typography>
      <Box mb={2}>
        <Typography variant="body1" gutterBottom>
          <strong>Order Description:</strong> {order.orderDescription}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Total Price:</strong> ${order.totalPrice}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Number of Items:</strong> {order.nbrItems}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>List of Products:</strong> {order.listProducts}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Buyer ID:</strong> {order.buyerId}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Seller ID:</strong> {order.sellerId}
        </Typography>
      </Box>

      <Button variant="contained" color="primary" onClick={handleEdit}>
        Edit Order
      </Button>
    </Box>
  );
};

export default OrderDetails;
