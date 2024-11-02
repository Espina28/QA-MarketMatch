package com.marketmatch.appdev.BackEnd.UserService;

import java.util.NoSuchElementException;
import java.util.Optional;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marketmatch.appdev.BackEnd.UserRepo.ProductRepo;
import com.marketmatch.appdev.BackEnd.UserEntity.ProductEntity;

@Service
public class ProductService {

    @Autowired
    ProductRepo prodrepo;

    public ProductService() {
        super();
    }
    
    //CREATE
    public ProductEntity createProduct(ProductEntity product) {
        return prodrepo.save(product);
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
