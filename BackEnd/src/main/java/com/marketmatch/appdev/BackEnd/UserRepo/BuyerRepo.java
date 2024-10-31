package com.marketmatch.appdev.finalproject.BuyerRepo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marketmatch.appdev.finalproject.BuyerEntity.BuyerEntity;

@Repository
public interface BuyerRepo extends JpaRepository<BuyerEntity, Integer> {
	
}
