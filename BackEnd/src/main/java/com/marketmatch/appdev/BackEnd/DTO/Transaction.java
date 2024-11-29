package com.marketmatch.appdev.BackEnd.DTO;

public class Transaction {
    private int buyId;
    private String customerName;
    private String productName;
    private int quantity;
    private double total;
    private byte[] image;
    private int productId;
    private int buyerId;
    private int sellerId;

    public Transaction() {
    }

    // Constructor with parameters for the DTO
    public Transaction(int buyId, String firstname, String lastname, String productName,
     int quantity, double total, byte[] image, int productId, int buyerId, int sellerId) {
        this.customerName = firstname + ' ' + lastname;
        this.productName = productName;
        this.quantity = quantity;
        this.total = total;
        this.buyId = buyId;
        this.image = image;
        this.productId = productId;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
    }

    // Getters and setters
    public int getBuyId() {
        return buyId;
    }

    public void setBuyId(int buyId) {
        this.buyId = buyId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(int buyerId) {
        this.buyerId = buyerId;
    }

    public int getSellerId() {
        return sellerId;
    }

    public void setSellerId(int sellerId) {
        this.sellerId = sellerId;
    }
    
    
}
