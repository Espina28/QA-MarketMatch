package com.marketmatch.appdev.BackEnd.Controller;

import com.marketmatch.appdev.BackEnd.Entity.SHistoryEntity;
import com.marketmatch.appdev.BackEnd.Service.SHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seller-history") // Base URL for this controller
public class SHistoryController {

    @Autowired
    private SHistoryService sHistoryService;


    @PostMapping("/create")
    public ResponseEntity<SHistoryEntity> createSHistoryEntity(@RequestBody SHistoryEntity sHistoryEntity) {
        SHistoryEntity createdSHistory = sHistoryService.createSHistoryEntity(sHistoryEntity);
        return new ResponseEntity<>(createdSHistory, HttpStatus.CREATED);  // Return the created entity
    }


    // Endpoint to get seller history by seller_id
    @GetMapping("/seller")
    public ResponseEntity<List<SHistoryEntity>> getSellerHistory(@RequestParam int sellerId) {
        List<SHistoryEntity> history = sHistoryService.getHistoryBySellerId(sellerId);
        if (history.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // No content found
        }
        return new ResponseEntity<>(history, HttpStatus.OK); // Return the list of seller history
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSHistoryEntity(@PathVariable int id) {
        sHistoryService.deleteSHistoryEntity(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
