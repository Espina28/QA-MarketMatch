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


    public CartEntity(){
        super();
    }
    public CartEntity(int cartID,String dateAdded, int quantity){
        this.cartID=cartID;
        this.dateAdded=dateAdded;
        this.quantity=quantity;
    }

    public int getCartID(){
        return cartID;
    }
    public void setCartID(int cartID){
        this.cartID=cartID;
    }
    public String getDateAdded(){
        return dateAdded;
    }
    public void setDateAdded(String dateAdded){
        this.dateAdded=dateAdded;
    }
    public int getQuantity(){
        return quantity;
    }
    public void setQuantity(int quantity){
        this.quantity=quantity;
    }

}