package tn.esprit.orderms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.orderms.entities.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByBuyerId(Long buyerId);
    List<Order> findBySellerId(Long sellerId);
}