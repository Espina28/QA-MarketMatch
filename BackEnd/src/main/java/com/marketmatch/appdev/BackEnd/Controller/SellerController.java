package com.marketmatch.appdev.BackEnd.Controller;


import com.marketmatch.appdev.BackEnd.Entity.SellerEntity;
import com.marketmatch.appdev.BackEnd.Entity.UserEntity;

import com.marketmatch.appdev.BackEnd.Service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/seller")
public class SellerController {

    @Autowired
    SellerService seller_serv;

    @GetMapping("/getAll")
    public List<SellerEntity> getAllSeller() {
        return seller_serv.getAllSeller();
    }

    @PutMapping("/edit")
    public SellerEntity editSeller(@RequestParam int id, @RequestBody SellerEntity seller) {
        return seller_serv.editSeller(id, seller);
    }

    @PostMapping("/create")
    public SellerEntity createSeller(@RequestBody UserEntity details) {
        return seller_serv.createNewSeller(details);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteSeller(@PathVariable int id) {
        return seller_serv.deleteSeller(id);
    }

}
