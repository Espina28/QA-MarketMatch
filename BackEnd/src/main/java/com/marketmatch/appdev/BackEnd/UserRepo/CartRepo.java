package com.marketmatch.appdev.BackEnd.UserRepo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marketmatch.appdev.BackEnd.UserEntity.CartEntity;

@Repository
public interface CartRepo extends JpaRepository<CartEntity, Integer> {
    public CartEntity findByCartID(int cartID);
}
