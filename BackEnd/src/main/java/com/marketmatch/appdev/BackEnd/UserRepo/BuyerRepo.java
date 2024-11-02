package com.marketmatch.appdev.BackEnd.UserRepo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marketmatch.appdev.BackEnd.UserEntity.BuyerEntity;

@Repository
public interface BuyerRepo extends JpaRepository<BuyerEntity, Integer> {
	
}
