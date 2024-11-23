package com.marketmatch.appdev.BackEnd.Controller;

import com.marketmatch.appdev.BackEnd.Entity.BHistoryEntity;
import com.marketmatch.appdev.BackEnd.Service.BHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buyer-history")  // Base URL for this controller
public class BHistoryController {
    @Autowired
    private BHistoryService bHistoryService;


    @PostMapping("/create")
    public ResponseEntity<BHistoryEntity> createBHistory(@RequestBody BHistoryEntity bHistory) {
        BHistoryEntity createdBHistory = bHistoryService.createBHistory(bHistory);
        return new ResponseEntity<>(createdBHistory, HttpStatus.CREATED);  // Return the created entity
    }
    // Endpoint to get buyer history by buyer_id
    @GetMapping("/buyer")
    public ResponseEntity<List<BHistoryEntity>> getBuyerHistory(@RequestParam int buyerId) {
        List<BHistoryEntity> history = bHistoryService.getHistoryByBuyerId(buyerId);
        if (history.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);  // No content found
        }
        return new ResponseEntity<>(history, HttpStatus.OK);  // Return the list of buyer history
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteHistoryEntity(@PathVariable int id) {
        bHistoryService.deleteHistoryEntity(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
