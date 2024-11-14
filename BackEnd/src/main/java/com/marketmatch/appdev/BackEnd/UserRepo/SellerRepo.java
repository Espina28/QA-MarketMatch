package com.marketmatch.appdev.BackEnd.UserRepo;


import com.marketmatch.appdev.BackEnd.UserEntity.SellerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepo extends JpaRepository<SellerEntity, Integer> {

}
