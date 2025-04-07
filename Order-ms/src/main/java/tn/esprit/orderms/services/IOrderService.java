package tn.esprit.orderms.services;

import tn.esprit.orderms.entities.Order;

import java.util.List;

public interface IOrderService {
    List<Order> getAllOrders();
    Order getOrderById(Long id);
    Order createOrder(Order order);
    void deleteOrder(Long id);
    List<Order> getOrdersByBuyer(Long buyerId);
    List<Order> getOrdersBySeller(Long sellerId);
}