package com.marketmatch.appdev.BackEnd.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marketmatch.appdev.BackEnd.UserEntity.CartEntity;
import com.marketmatch.appdev.BackEnd.UserRepo.CartRepo;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CartService {

    @Autowired
    private CartRepo cartRepo;

    public CartService() {
        super();
    }

    // Create
    public CartEntity postCart(CartEntity cart) {
        return cartRepo.save(cart);
    }

    // Read
    public List<CartEntity> getAllCarts() {
        return cartRepo.findAll();
    }

    // Update
    public CartEntity updateCartDetails(int id, CartEntity newCartDetails) {
        return cartRepo.findById(id).map(cart -> {
            cart.setDateAdded(newCartDetails.getDateAdded());
            cart.setQuantity(newCartDetails.getQuantity());
            return cartRepo.save(cart);
        }).orElseThrow(() -> new NoSuchElementException("Cart record with ID " + id + " not found"));
    }

    // Delete
    public String deleteCart(int id) {
        if (cartRepo.findById(id).isPresent()) {
            cartRepo.deleteById(id);
            return "Cart successfully deleted";
        } else {
            return "Cart with ID " + id + " not found!";
        }
    }
}