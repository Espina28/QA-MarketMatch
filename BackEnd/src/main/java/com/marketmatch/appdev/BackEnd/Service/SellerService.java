package com.marketmatch.appdev.BackEnd.Service;


import com.marketmatch.appdev.BackEnd.DTO.Transaction;
import com.marketmatch.appdev.BackEnd.Entity.CartEntity;
import com.marketmatch.appdev.BackEnd.Entity.ProductEntity;
import com.marketmatch.appdev.BackEnd.Entity.SellerEntity;
import com.marketmatch.appdev.BackEnd.Entity.UserEntity;
import com.marketmatch.appdev.BackEnd.Repository.SellerRepo;
import com.marketmatch.appdev.BackEnd.Repository.UserRepo;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.NameNotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class SellerService {

    @Autowired
    SellerRepo seller_repo;

    @Autowired
    UserRepo user_repo;

    public SellerService(){
        super();
    }

    public List<SellerEntity> getAllSeller(){
        return seller_repo.findAll();
    }

    public SellerEntity getSellerById(int id) {
        return seller_repo.findById(id);
    }


    public SellerEntity createNewSeller(SellerEntity seller, int sellerid){
        seller.setSeller_id(sellerid);
        return seller_repo.save(seller);
    }

    public List<Transaction> getTransactions(String email) {
        int sellerId = user_repo.findByEmail(email).getSeller_id().getSeller_id();

        if (sellerId != 0) {
            return seller_repo.getTransactions(sellerId);
        } else
            return null;
    }

     public SellerEntity addProductToSeller(int sellerId, ProductEntity product) {
        SellerEntity seller = seller_repo.findById(sellerId);
        
        List<ProductEntity> products = seller.getProducts();
        if (products == null) {
            products = new ArrayList<>();
        }
        products.add(product);
        seller.setProducts(products);
        product.setSellerid(seller);
        seller = seller_repo.save(seller);
        
        return seller;
    }

    @SuppressWarnings("finally")
    public SellerEntity editSeller(int id, SellerEntity details){
        SellerEntity updateSeller = new SellerEntity();

        try{
            updateSeller = seller_repo.findById(id);
            updateSeller.setProducts_sold(details.getProducts_sold());

        }catch (NoSuchElementException err){
            throw new NameNotFoundException("Not found");
        }finally{
            return seller_repo.save(updateSeller);
        }
    }

    public String deleteSeller(int id){
        String msg ="";

        if(seller_repo.findById(id) != null) {
            seller_repo.deleteById(id);
            msg = "Seller Record Deleted Successfully";
        }else{
            msg = id + "not found!";
        }
        return msg;
    }
}
