package com.marketmatch.appdev.BackEnd.Repository;


import com.marketmatch.appdev.BackEnd.DTO.Transaction;
import com.marketmatch.appdev.BackEnd.Entity.ProductEntity;
import com.marketmatch.appdev.BackEnd.Entity.SellerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;


@Repository
public interface SellerRepo extends JpaRepository<SellerEntity, Integer> {
    SellerEntity findById(int id);

//    @Query("SELECT CONCAT(user.Firstname,' ',user.Lastname) as customerName, prod.productName, quantity, total" +
//            "FROM ProductEntity prod JOIN prod.sellerid seller ON seller.seller_id=1 JOIN prod.bought buy ON buy.product.productId = prod.productId" +
//            "JOIN buy.buyer buyer ON buy.buyer.buyerId = buyer.buyerId JOIN buyer.userId user ON user.userId = buyer.user.userId")

//    @Query("SELECT CONCAT(user.Firstname,' ', user.Lastname) AS customerName, prod.productName as productName, buy.quantity as quantity, buy.total as total FROM ProductEntity prod JOIN prod.sellerid seller JOIN prod.bought buy JOIN buy.buyer buyer JOIN buyer.user user WHERE seller.sellerId = 1")


@Query("SELECT new com.marketmatch.appdev.BackEnd.DTO.Transaction(buy.buyId, user.Firstname, user.Lastname, " +
        "prod.productName, buy.quantity, buy.total, prod.image,prod.productId, buyer.buyerId) " +
        "FROM ProductEntity prod " +
        "JOIN prod.sellerid seller " +
        "JOIN prod.bought buy " +
        "JOIN buy.buyer buyer " +
        "JOIN buyer.user user " +
        "WHERE seller.seller_id = :sellerId")
List<Transaction> getTransactions(@Param("sellerId") int sellerId);


}
