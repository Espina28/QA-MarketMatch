package com.marketmatch.appdev.BackEnd.UserEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

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
    
    public ProductEntity() {
        super();
    }

    public ProductEntity(int productId, String productName, String productDescription, String productPrice,
            String productStock, String productStatus, String productTimeCreated) {
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.productStock = productStock;
        this.productStatus = productStatus;
        this.productTimeCreated = productTimeCreated;
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

    

}
