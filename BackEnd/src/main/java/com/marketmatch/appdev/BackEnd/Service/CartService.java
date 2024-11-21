package com.marketmatch.appdev.BackEnd.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marketmatch.appdev.BackEnd.Entity.CartEntity;
import com.marketmatch.appdev.BackEnd.Entity.ProductEntity;
import com.marketmatch.appdev.BackEnd.Repository.CartRepo;
import com.marketmatch.appdev.BackEnd.Repository.ProductRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CartService {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private ProductRepo productRepo;

    public CartService() {
        super();
    }

    // Create
    public CartEntity postCart(CartEntity cart, int cartid) {
        cart.setCartID(cartid);
        return cartRepo.save(cart);
    }

    // Read
    public List<CartEntity> getAllCarts() {
        return cartRepo.findAll();
    }

    public CartEntity getCartById(int cartId) {
        return cartRepo.findById(cartId).orElse(null);
    }

    // Update
    public CartEntity updateCartDetails(int id, CartEntity newCartDetails) {
        return cartRepo.findById(id).map(cart -> {
            cart.setDateAdded(newCartDetails.getDateAdded());
            cart.setQuantity(newCartDetails.getQuantity());
            return cartRepo.save(cart);
        }).orElseThrow(() -> new NoSuchElementException("Cart record with ID " + id + " not found"));
    }

    public CartEntity addProductToCart(int cartId, int productid) {
        CartEntity cart = cartRepo.findById(cartId).orElseThrow();
        ProductEntity product = productRepo.findById(productid).orElseThrow();
        List<ProductEntity> products = cart.getProducts();
        if (products == null) {
            products = new ArrayList<>();
        }
        products.add(product);
        cart.setProducts(products);
        
       
        product.addCart(cart);
        
        
        cart = cartRepo.save(cart);
        
        return cart;
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

    public CartEntity removeProductFromCart(int cartId, int productId) {
        CartEntity cart = cartRepo.findById(cartId).orElseThrow(() -> new NoSuchElementException("Cart not found"));
    List<ProductEntity> products = cart.getProducts();

    if (products != null && !products.isEmpty()) {
        ProductEntity productToRemove = null;

        for (ProductEntity product : products) {
            if (product.getProductId() == productId) {
                productToRemove = product;
                break;
            }
        }

        if (productToRemove != null) {
            productToRemove.setCart(null);
            products.remove(productToRemove);
            cart.setProducts(products);
            cartRepo.save(cart);
        } else {
            throw new NoSuchElementException("Product with ID " + productId + " not found in the cart.");
        }
    } else {
        throw new NoSuchElementException("Cart has no products.");
    }

    return cart;
    }
}