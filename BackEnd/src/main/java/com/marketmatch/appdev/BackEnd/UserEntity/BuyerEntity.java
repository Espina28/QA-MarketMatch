package com.marketmatch.appdev.BackEnd.UserEntity;

import jakarta.persistence.*;

@Entity
public class BuyerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int buyerId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private UserEntity user;

    private int totalProductBought;

    // Constructors
    public BuyerEntity() {
    }

    public BuyerEntity(UserEntity user, int totalProductBought) {
        this.user = user;
        this.totalProductBought = totalProductBought;
    }

    // Getters and Setters
    public int getBuyerId() {
        return buyerId;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public int getTotalProductBought() {
        return totalProductBought;
    }

    public void setTotalProductBought(int totalProductBought) {
        this.totalProductBought = totalProductBought;
    }
}
