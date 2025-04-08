package tn.esprit.orderms.services;

import org.springframework.stereotype.Service;
import tn.esprit.orderms.entities.Order;
import tn.esprit.orderms.entities.OrderStatus;
import tn.esprit.orderms.repositories.OrderRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements IOrderService {
    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Override
    public Order createOrder(Order order) {
        order.setOrderDate(LocalDateTime.now());
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public List<Order> getOrdersByBuyer(Long buyerId) {
        return orderRepository.findByBuyerId(buyerId);
    }

    @Override
    public List<Order> getOrdersBySeller(Long sellerId) {
        return orderRepository.findBySellerId(sellerId);
    }

    @Override
    public Order updateOrder(Long id, Order updatedOrder) {
        Optional<Order> existingOrderOpt = orderRepository.findById(id);
        if (existingOrderOpt.isEmpty()) return null;

        Order existingOrder = existingOrderOpt.get();

        existingOrder.setOrderDescription(updatedOrder.getOrderDescription());
        existingOrder.setTotalPrice(updatedOrder.getTotalPrice());
        existingOrder.setNbrItems(updatedOrder.getNbrItems());
        existingOrder.setListProducts(updatedOrder.getListProducts());
        existingOrder.setBuyerId(updatedOrder.getBuyerId());
        existingOrder.setSellerId(updatedOrder.getSellerId());

        return orderRepository.save(existingOrder);
    }

    @Override
    public Order updateOrderStatus(Long orderId, String newStatus) {
        OrderStatus status;
        try {
            status = OrderStatus.valueOf(newStatus.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null; // Invalid status
        }

        // Check if the order exists
        Optional<Order> existingOrderOpt = orderRepository.findById(orderId);
        if (existingOrderOpt.isEmpty()) {
            return null; // Order not found
        }

        Order existingOrder = existingOrderOpt.get();

        // Prevent changing the status if the order is already delivered
        if (existingOrder.getStatus() == OrderStatus.DELIVERED && status != OrderStatus.DELIVERED) {
            throw new IllegalStateException("Delivered orders cannot be changed.");
        }

        existingOrder.setStatus(status);
        return orderRepository.save(existingOrder);
    }
}