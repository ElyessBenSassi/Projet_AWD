import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrdersByBuyer = () => {
  const { buyerId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersByBuyer = async () => {
      try {
        const response = await axios.get(`/orders/buyer/${buyerId}`);
        setOrders(response.data); // Set the fetched orders into the state
      } catch (error) {
        console.error("Error fetching orders by buyer:", error);
      }
    };

    fetchOrdersByBuyer();
  }, [buyerId]); 

  return (
    <div>
      <h2>Orders by Buyer</h2>
      {orders.length === 0 ? (
        <p>No orders found for this buyer.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h3>Order #{order.id}</h3>
              <p><strong>Order Description:</strong> {order.orderDescription}</p>
              <p><strong>Total Price:</strong> ${order.totalPrice}</p>
              <p><strong>Nbr Items:</strong> {order.nbrItems}</p>
              <p><strong>List Products:</strong> {order.listProducts}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Buyer ID:</strong> {order.buyerId}</p>
              <p><strong>Seller ID:</strong> {order.sellerId}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersByBuyer;
