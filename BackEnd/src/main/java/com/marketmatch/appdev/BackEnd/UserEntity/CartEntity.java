package com.marketmatch.appdev.BackEnd.UserEntity;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
    

@Entity
public class CartEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartID;

    private String dateAdded;
    private int quantity;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ProductEntity> products;

    public CartEntity() {
        super();
    }

    public CartEntity(int cartID, String dateAdded, int quantity, List<ProductEntity> products) {
        this.cartID = cartID;
        this.dateAdded = dateAdded;
        this.quantity = quantity;
        this.products = products;
    }

    public int getCartID() {
        return cartID;
    }

    public void setCartID(int cartID) {
        this.cartID = cartID;
    }

    public String getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(String dateAdded) {
        this.dateAdded = dateAdded;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public List<ProductEntity> getProducts() {
        return products;
    }

    public void setProducts(List<ProductEntity> products) {
        this.products = products;
    }

    

}