package com.marketmatch.appdev.BackEnd.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Repository;

import com.marketmatch.appdev.BackEnd.Entity.ProductEntity;
import com.marketmatch.appdev.BackEnd.Entity.SellerEntity;

@Repository
public interface ProductRepo extends JpaRepository<ProductEntity, Integer> {
    ProductEntity findByproductId(int productId);
    List<ProductEntity> findBysellerid(SellerEntity sellerid);
}
