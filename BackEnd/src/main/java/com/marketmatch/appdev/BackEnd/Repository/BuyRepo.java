package com.marketmatch.appdev.BackEnd.Repository;

import com.marketmatch.appdev.BackEnd.DTO.Transaction;
import com.marketmatch.appdev.BackEnd.Entity.BuyEntity;
import com.marketmatch.appdev.BackEnd.Entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyRepo extends JpaRepository<BuyEntity, Integer> {

    @Query("SELECT new com.marketmatch.appdev.BackEnd.DTO.Transaction(buy.buyId, user.Firstname, user.Lastname, " +
    "prod.productName, buy.quantity, buy.total, prod.image,prod.productId, buyer.buyerId, seller.seller_id) " +
    "FROM ProductEntity prod " +
    "JOIN prod.sellerid seller " +
    "JOIN prod.bought buy " +
    "JOIN buy.buyer buyer " +
    "JOIN buyer.user user " +
    "WHERE buyer.buyerId = :buyerId")
    List<Transaction> findBuyerItems(@Param("buyerId") int buyerId);


    @Query("SELECT prod FROM ProductEntity prod JOIN prod.bought buy WHERE buy.buyer.buyerId =:buyerId")
    List<ProductEntity> getPurchased(@Param("buyerId") int buyerId);

}
