package com.marketmatch.appdev.BackEnd.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marketmatch.appdev.BackEnd.Entity.BuyerEntity;

@Repository
public interface BuyerRepo extends JpaRepository<BuyerEntity, Integer> {
	BuyerEntity findByBuyerId(int buyerId);
}
