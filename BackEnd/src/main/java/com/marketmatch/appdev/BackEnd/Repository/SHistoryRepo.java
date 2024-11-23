package com.marketmatch.appdev.BackEnd.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.marketmatch.appdev.BackEnd.Entity.SHistoryEntity;

@Repository
public interface SHistoryRepo extends JpaRepository<SHistoryEntity, Integer> {
    @Query("SELECT s FROM SHistoryEntity s WHERE s.seller.seller_id = :seller_id")
    List<SHistoryEntity> findBySellerId(@Param("seller_id") int seller_id);
}