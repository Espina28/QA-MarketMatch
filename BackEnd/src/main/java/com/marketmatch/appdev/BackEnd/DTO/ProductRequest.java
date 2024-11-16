package com.marketmatch.appdev.BackEnd.DTO;

import com.marketmatch.appdev.BackEnd.Entity.ProductEntity;

public class ProductRequest {
    private String email;
    private ProductEntity product;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ProductEntity getProduct() {
        return product;
    }

    public void setProduct(ProductEntity product) {
        this.product = product;
    }
}
