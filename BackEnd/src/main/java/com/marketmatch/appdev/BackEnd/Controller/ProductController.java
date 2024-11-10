package com.marketmatch.appdev.BackEnd.Controller;


import com.marketmatch.appdev.BackEnd.DTO.Account;
import com.marketmatch.appdev.BackEnd.DTO.ProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.marketmatch.appdev.BackEnd.Entity.ProductEntity;
import com.marketmatch.appdev.BackEnd.Service.ProductService;

@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/api/user")
public class ProductController {

    @Autowired
    ProductService productService;

    // CREATE
    @PostMapping("/postProduct")
    public ProductEntity postProduct(@RequestBody ProductEntity product) {
        return productService.createProduct(product);
    }

    //as User create a product it signals that it became a seller
    // therefore it needs the UserEntity to create Seller and the Product Details
    //to connect everything via Foreign Keys
    @PostMapping("/create")
    public ProductEntity createProduct(@RequestBody ProductRequest product){
        System.out.println(product);
//        return productService.createProducts(product);
        return null;
    }

    // READ
    @GetMapping("/getProducts/{productId}")
    public ProductEntity getProducts(@PathVariable int productId) {
        return productService.readProducts(productId);
    }

    // UPDATE
    @PutMapping("/putProduct/{productId}")
    public ProductEntity putProduct(@RequestParam int productId, @RequestBody ProductEntity productName) {
        return productService.updateProduct(productId, productName);
    }

    // DELETE
    @DeleteMapping("/deleteProduct/{productId}")
    public String deleteProduct(@PathVariable int productId) {
        return productService.deleteProduct(productId);
    }
}
