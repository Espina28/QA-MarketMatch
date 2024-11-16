package com.marketmatch.appdev.BackEnd.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.marketmatch.appdev.BackEnd.Entity.CartEntity;
import com.marketmatch.appdev.BackEnd.Entity.ProductEntity;
import com.marketmatch.appdev.BackEnd.Service.CartService;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;


    // Create
    @PostMapping("/postCart/{cartid}")
    public CartEntity postCart(@RequestBody CartEntity cart, @PathVariable int cartid) {
        return cartService.postCart(cart, cartid);
    }

    @PostMapping("/addProduct/{cartId}")
    public CartEntity addProductToCart(@PathVariable int cartId, @RequestBody ProductEntity product) {
        return cartService.addProductToCart(cartId, product);
    }

    @DeleteMapping("/{cartId}/product/{productId}")
    public ResponseEntity<String> removeProductFromCart(@PathVariable int cartId, @PathVariable int productId) {
        CartEntity cart = cartService.removeProductFromCart(cartId, productId);
        if (cart == null) {
            return ResponseEntity.status(404).body("Product or Cart not found");
        }
        return ResponseEntity.ok("Product removed from cart");
    }

    // Read
    @GetMapping("/getCart/{cartId}")
    public CartEntity  getAllCarts(@PathVariable int cartId) {
        CartEntity cart = cartService.getCartById(cartId);
        cart.getProducts().size(); // This will fetch the products
        return cart;
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