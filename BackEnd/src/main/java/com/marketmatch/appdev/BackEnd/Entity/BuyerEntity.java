package com.marketmatch.appdev.BackEnd.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "tbl_buyer")
public class BuyerEntity {

    @Id
    private int buyerId;

    private int totalTransaction;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @JsonManagedReference
    @OneToMany(mappedBy = "buyer", fetch = FetchType.LAZY)
    private List<BuyEntity> bought;

    public int getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(int buyerId) {
        this.buyerId = buyerId;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public int getTotalTransaction() {
        return totalTransaction;
    }

    public void setTotalTransaction(int totalTransaction) {
        this.totalTransaction = totalTransaction;
    }

    public List<BuyEntity> getBought() {
        return bought;
    }

    public void setBought(List<BuyEntity> bought) {
        this.bought = bought;
    }
    
    
}
