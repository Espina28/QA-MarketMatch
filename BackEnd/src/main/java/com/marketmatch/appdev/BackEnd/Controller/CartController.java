package com.marketmatch.appdev.BackEnd.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.marketmatch.appdev.BackEnd.Entity.CartEntity;
import com.marketmatch.appdev.BackEnd.Service.CartService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Create
    @PostMapping("/postCart")
    public CartEntity postCart(@RequestBody CartEntity cart) {
        return cartService.postCart(cart);
    }

    // Read
    @GetMapping("/getCart")
    public List<CartEntity> getAllCarts() {
        return cartService.getAllCarts();
    }

    // Update
    @PutMapping("/putCartDetails")
    public CartEntity putCartDetails(@RequestParam int id, @RequestBody CartEntity updatedCart) {
        return cartService.updateCartDetails(id, updatedCart);
    }

    // Delete
    @DeleteMapping("/deleteCart/{id}")
    public String deleteCart(@PathVariable int id) {
        return cartService.deleteCart(id);
    }
}