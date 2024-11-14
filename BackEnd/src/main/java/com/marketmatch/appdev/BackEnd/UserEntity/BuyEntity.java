package com.marketmatch.appdev.BackEnd.UserEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "tbl_buy")
public class BuyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int buyId;
    private int quantity;
    private String orderDate;
    private double total;

    @JsonBackReference("buyer-reference")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "buyer_id")
    private BuyerEntity buyer;

    @JsonBackReference("product-reference")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private ProductEntity product;


    public int getBuyId() {
        return buyId;
    }

    public void setBuyId(int buyId) {
        this.buyId = buyId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public BuyerEntity getBuyer() {
        return buyer;
    }

    public void setBuyer(BuyerEntity buyer) {
        this.buyer = buyer;
    }

    public ProductEntity getProduct() {
        return product;
    }

    public void setProduct(ProductEntity product) {
        this.product = product;
    }
}

