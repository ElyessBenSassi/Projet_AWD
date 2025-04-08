import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const OrderUpdate = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    orderDescription: '',
    totalPrice: '',
    nbrItems: '',
    listProducts: '',
    buyerId: '',
    sellerId: '',
  });

  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/orders/getById/${orderId}`);
        if (response.data) {
          setOrderDetails({
            orderDescription: response.data.orderDescription || '',
            totalPrice: response.data.totalPrice || '',
            nbrItems: response.data.nbrItems || '',
            listProducts: response.data.listProducts || '',
            buyerId: response.data.buyerId || '',
            sellerId: response.data.sellerId || '',
          });
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedOrder = {
        orderDescription: orderDetails.orderDescription,
        totalPrice: orderDetails.totalPrice,
        nbrItems: orderDetails.nbrItems,
        listProducts: orderDetails.listProducts,
        buyerId: orderDetails.buyerId,
        sellerId: orderDetails.sellerId,
      };

      // Send the updated order to the backend
      const response = await axios.put(`http://localhost:8082/orders/update/${orderId}`, updatedOrder);
      if (response.data) {
        alert('Order updated successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order.');
    }
  };

  return (
    <div>
      <h2>Update Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Order Description:</label>
          <input
            type="text"
            name="orderDescription"
            value={orderDetails.orderDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Total Price:</label>
          <input
            type="number"
            name="totalPrice"
            value={orderDetails.totalPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Number of Items:</label>
          <input
            type="number"
            name="nbrItems"
            value={orderDetails.nbrItems}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>List of Products:</label>
          <input
            type="text"
            name="listProducts"
            value={orderDetails.listProducts}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Buyer ID:</label>
          <input
            type="number"
            name="buyerId"
            value={orderDetails.buyerId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Seller ID:</label>
          <input
            type="number"
            name="sellerId"
            value={orderDetails.sellerId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Order</button>
      </form>
    </div>
  );
};

export default OrderUpdate;
