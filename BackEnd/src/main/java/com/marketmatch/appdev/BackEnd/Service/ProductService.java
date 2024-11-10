package com.marketmatch.appdev.BackEnd.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

import javax.naming.NameNotFoundException;

import com.marketmatch.appdev.BackEnd.DTO.Account;
import com.marketmatch.appdev.BackEnd.DTO.ProductRequest;
import com.marketmatch.appdev.BackEnd.Entity.SellerEntity;
import com.marketmatch.appdev.BackEnd.Entity.UserEntity;
import com.marketmatch.appdev.BackEnd.Repository.SellerRepo;
import com.marketmatch.appdev.BackEnd.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marketmatch.appdev.BackEnd.Repository.ProductRepo;
import com.marketmatch.appdev.BackEnd.Entity.ProductEntity;

@Service
public class ProductService {

    @Autowired
    ProductRepo prodrepo;

    @Autowired
    UserRepo user_repo;

    @Autowired
    SellerService seller_serv;

    public ProductService() {
        super();
    }
    
    //CREATE
    public ProductEntity createProduct(ProductEntity product) {
        return prodrepo.save(product);
    }

    public ProductEntity createProducts(ProductRequest product){
        UserEntity user = user_repo.findByEmail(product.getEmail());

        if(user.getSeller_id() != null){
            product.getProduct().setSellerid(user.getSeller_id());
        }else{
            SellerEntity seller = seller_serv.createNewSeller(user);
            product.getProduct().setSellerid(seller);
        }
        return prodrepo.save(product.getProduct());
    }

    //READ
    public ProductEntity readProducts(int productId) {
        try {
            Optional<ProductEntity> productOptional = prodrepo.findById(productId);
            if (productOptional.isPresent()) {
                return productOptional.get(); 
            } else {
                throw new RuntimeException("Product not found with ID: " + productId); 
            }
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving product: " + e.getMessage(), e); 
        }
    }


    //UPDATE
    @SuppressWarnings("finally")
    public ProductEntity updateProduct(int productId, ProductEntity productName) {
        ProductEntity product = new ProductEntity();
        try {
            product = prodrepo.findById(productId).get();

            product.setProductName(productName.getProductName());
            product.setProductDescription(productName.getProductDescription());
            product.setProductPrice(productName.getProductPrice());
            product.setProductStock(productName.getProductStock());
            product.setProductStatus(productName.getProductStatus());
            product.setProductTimeCreated(productName.getProductTimeCreated());
            return prodrepo.save(product);
        } catch(NoSuchElementException nex){
            throw new NameNotFoundException("Product " + productId + " not found");
        }finally {
            return prodrepo.save(product);
        }
    }

    //DELETE
    @SuppressWarnings("unused")
    public String deleteProduct(int productId) {
        String msg = "";
        if (prodrepo.findById(productId) != null) {
            prodrepo.deleteById(productId);
            msg = "Product Record successfully deleted";
        } else {
            msg = productId + "NOT found";
        }
        return msg;
    }
}
