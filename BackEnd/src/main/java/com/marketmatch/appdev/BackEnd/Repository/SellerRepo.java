package com.marketmatch.appdev.BackEnd.Repository;


import com.marketmatch.appdev.BackEnd.Entity.SellerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface SellerRepo extends JpaRepository<SellerEntity, Integer> {
    SellerEntity findById(int id);
}
