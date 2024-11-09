package com.marketmatch.appdev.BackEnd.Repository;

import com.marketmatch.appdev.BackEnd.Entity.BuyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyRepo extends JpaRepository<BuyEntity, Integer> {

    @Query("SELECT buy FROM BuyEntity buy WHERE buy.buyer.buyerId = :buyerId")
    List<BuyEntity> findBuyerItems(@Param("buyerId") int buyerId);

}
