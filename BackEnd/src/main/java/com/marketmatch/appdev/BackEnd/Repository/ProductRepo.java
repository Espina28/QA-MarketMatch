package com.marketmatch.appdev.BackEnd.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marketmatch.appdev.BackEnd.Entity.ProductEntity;

@Repository
public interface ProductRepo extends JpaRepository<ProductEntity, Integer> {
    ProductEntity findByproductId(int productId);
}
