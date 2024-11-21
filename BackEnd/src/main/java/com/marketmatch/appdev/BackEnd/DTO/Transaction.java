package com.marketmatch.appdev.BackEnd.DTO;

public class Transaction {
    private int buyId;
    private String customerName;
    private String productName;
    private int quantity;
    private double total;

    public Transaction() {
    }

    public Transaction(int buyId, String Firstname,String Lastname ,String productName, int quantity, double total) {
        this.customerName = Firstname + ' ' + Lastname;
        this.productName = productName;
        this.quantity = quantity;
        this.total = total;
        this.buyId = buyId;
    }

    public void setBuyId(int buyId){
        this.buyId = buyId;
    }

    public int getBuyIdId(){
        return this.buyId;
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
}
