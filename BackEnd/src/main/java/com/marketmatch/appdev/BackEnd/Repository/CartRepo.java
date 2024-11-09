package com.marketmatch.appdev.BackEnd.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marketmatch.appdev.BackEnd.Entity.CartEntity;

@Repository
public interface CartRepo extends JpaRepository<CartEntity, Integer> {
    CartEntity findByCartID(int cartID);
}
