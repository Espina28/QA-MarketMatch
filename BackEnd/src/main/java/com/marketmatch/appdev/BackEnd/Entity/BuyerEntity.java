package com.marketmatch.appdev.BackEnd.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class BuyerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int buyerId;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private UserEntity user;
    private int totalTransaction;

    @JsonManagedReference("buyer-reference")
    @OneToMany(mappedBy = "buyer", fetch = FetchType.LAZY)
    private List<BuyEntity> bought;

    public BuyerEntity() {
    }

    public BuyerEntity(int buyerId, UserEntity user, int totalTransaction, List<BuyEntity> bought) {
        this.buyerId = buyerId;
        this.user = user;
        this.totalTransaction = totalTransaction;
        this.bought = bought;
    }

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
