import React, { useState } from 'react';
import axios from 'axios';

function CreateOrder() {
  const [order, setOrder] = useState({
    orderDescription: '',
    totalPrice: 0,
    nbrItems: 0,
    listProducts: '', // Assuming listProducts is a comma-separated string for simplicity
    buyerId: 0,
    sellerId: 0,
    status: 'PENDING',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: name === 'totalPrice' || name === 'nbrItems' || name === 'buyerId' || name === 'sellerId'
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post the order object to the backend
      await axios.post('http://localhost:8082/orders/create', order, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Order created successfully!');
      // Reset the form
      setOrder({
        orderDescription: '',
        totalPrice: 0,
        nbrItems: 0,
        listProducts: '',
        buyerId: 0,
        sellerId: 0,
        status: 'PENDING',
      });
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order.');
    }
  };

  return (
    <div>
      <h2>Create New Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Order Description:
          <input
            type="text"
            name="orderDescription"
            value={order.orderDescription}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Total Price:
          <input
            type="number"
            name="totalPrice"
            value={order.totalPrice}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Number of Items:
          <input
            type="number"
            name="nbrItems"
            value={order.nbrItems}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          List of Products (comma-separated):
          <input
            type="text"
            name="listProducts"
            value={order.listProducts}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Buyer ID:
          <input
            type="number"
            name="buyerId"
            value={order.buyerId}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Seller ID:
          <input
            type="number"
            name="sellerId"
            value={order.sellerId}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Status:
          <select name="status" value={order.status} onChange={handleChange}>
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </label>
        <br />

        <button type="submit">Create Order</button>
      </form>
    </div>
  );
}

export default CreateOrder;
