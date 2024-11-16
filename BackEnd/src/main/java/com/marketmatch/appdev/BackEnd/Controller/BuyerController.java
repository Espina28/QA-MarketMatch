package com.marketmatch.appdev.BackEnd.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.marketmatch.appdev.BackEnd.Entity.BuyerEntity;
import com.marketmatch.appdev.BackEnd.Service.BuyerService;

import java.util.List;

@RestController
@RequestMapping("/api/buyers")
public class BuyerController {

    @Autowired
    private BuyerService bserv;

    // Create a new buyer
    @PostMapping
    public ResponseEntity<BuyerEntity> createBuyer(@RequestBody BuyerEntity buyer) {
        BuyerEntity savedBuyer = bserv.saveBuyer(buyer);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBuyer);
    }

    // Get a buyer by ID
    @GetMapping("/{id}")
    public ResponseEntity<BuyerEntity> getBuyer(@PathVariable int id) {
        BuyerEntity buyer = bserv.findBuyerById(id);
        return buyer != null ? ResponseEntity.ok(buyer) : ResponseEntity.notFound().build();
    }

    // Update an existing buyer
    @PutMapping("/{id}")
    public ResponseEntity<BuyerEntity> updateBuyer(@PathVariable int id, @RequestBody BuyerEntity buyer) {
        // Check if buyer exists
        BuyerEntity existingBuyer = bserv.findBuyerById(id);
        if (existingBuyer == null) {
            return ResponseEntity.notFound().build();
        }

        // Update buyer details
        existingBuyer.setTotalTransaction(buyer.getTotalTransaction());
        // Optionally, update any other fields as needed

        BuyerEntity updatedBuyer = bserv.saveBuyer(existingBuyer);
        return ResponseEntity.ok(updatedBuyer);
    }

    // Delete a buyer by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBuyer(@PathVariable int id) {
        BuyerEntity existingBuyer = bserv.findBuyerById(id);
        if (existingBuyer != null) {
        	bserv.deleteBuyer(id); // Implement this method in BuyerService
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Optional: Get all buyers
    @GetMapping
    public ResponseEntity<List<BuyerEntity>> getAllBuyers() {
        List<BuyerEntity> buyers = bserv.findAllBuyers(); // Implement this method in BuyerService
        return ResponseEntity.ok(buyers);
    }
}
