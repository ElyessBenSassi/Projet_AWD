package tn.esprit.orderms.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.orderms.entities.Order;
import tn.esprit.orderms.services.IOrderService;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final IOrderService orderService;

    public OrderController(IOrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        return order != null ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
    }

    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order createdOrder = orderService.createOrder(order);
        return ResponseEntity.ok(createdOrder);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<Order>> getOrdersByBuyer(@PathVariable Long buyerId) {
        return ResponseEntity.ok(orderService.getOrdersByBuyer(buyerId));
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<Order>> getOrdersBySeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(orderService.getOrdersBySeller(sellerId));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order orderDetails) {
        Order updatedOrder = orderService.updateOrder(id, orderDetails);
        return updatedOrder != null ? ResponseEntity.ok(updatedOrder) : ResponseEntity.notFound().build();
    }

    @PutMapping("/updateStatus/{orderId}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @RequestParam String status) {
        try {
            Order updatedOrder = orderService.updateOrderStatus(orderId, status);
            if (updatedOrder == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            return ResponseEntity.ok(updatedOrder);
        } catch (IllegalStateException e) {
            // If the exception is thrown, return a 400 BAD REQUEST with the message
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            // Catch any other exceptions and return a 500 INTERNAL SERVER ERROR
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}