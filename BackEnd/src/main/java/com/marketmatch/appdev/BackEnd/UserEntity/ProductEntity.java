package com.marketmatch.appdev.BackEnd.UserEntity;



import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;


@Entity
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    private String productName;
    private String productDescription;
    private String productPrice;
    private String productStock;
    private String productStatus;
    private String productTimeCreated;

    @Column(name = "image",columnDefinition = "longblob")
    private byte[] image;
    
    @ManyToOne
    @JoinColumn(name="cartid")
    private CartEntity cartid;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "seller_id")
    private  SellerEntity sellerid;

    @JsonManagedReference("product-reference")
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<BuyEntity> bought;

    public ProductEntity() {
        super();
    }

    public ProductEntity(int productId, String productName, String productDescription, String productPrice,
            String productStock, String productStatus, String productTimeCreated, byte[] image) {
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.productStock = productStock;
        this.productStatus = productStatus;
        this.productTimeCreated = productTimeCreated;
        this.image = image;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public String getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(String productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductStock() {
        return productStock;
    }

    public void setProductStock(String productStock) {
        this.productStock = productStock;
    }

    public String getProductStatus() {
        return productStatus;
    }

    public void setProductStatus(String productStatus) {
        this.productStatus = productStatus;
    }

    public String getProductTimeCreated() {
        return productTimeCreated;
    }

    public void setProductTimeCreated(String productTimeCreated) {
        this.productTimeCreated = productTimeCreated;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public CartEntity getCartid() {
        return cartid;
    }

    public void setCartid(CartEntity cartid) {
        this.cartid = cartid;
    }

    public SellerEntity getSellerid() {
        return sellerid;
    }

    public void setSellerid(SellerEntity sellerid) {
        this.sellerid = sellerid;
    }

    public List<BuyEntity> getBought() {
        return bought;
    }

    public void setBought(List<BuyEntity> bought) {
        this.bought = bought;
    }
    
    

}
