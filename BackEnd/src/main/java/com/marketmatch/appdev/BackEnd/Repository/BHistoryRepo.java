package com.marketmatch.appdev.BackEnd.Repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.marketmatch.appdev.BackEnd.Entity.BHistoryEntity;

@Repository
public interface BHistoryRepo extends JpaRepository<BHistoryEntity, Integer> {
    @Query("SELECT b FROM BHistoryEntity b WHERE b.buyer.buyerId = :buyer_id")
    List<BHistoryEntity> findByBuyerId(@Param("buyer_id") int buyer_id);
}
