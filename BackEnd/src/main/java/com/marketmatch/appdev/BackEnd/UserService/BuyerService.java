package com.marketmatch.appdev.BackEnd.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marketmatch.appdev.BackEnd.UserEntity.BuyerEntity;
import com.marketmatch.appdev.BackEnd.UserRepo.BuyerRepo;

import java.util.List;

@Service
public class BuyerService {

    @Autowired
    private BuyerRepo buyerRepository;

    // Save a new buyer
    public BuyerEntity saveBuyer(BuyerEntity buyer) {
        return buyerRepository.save(buyer);
    }

    // Find a buyer by ID
    public BuyerEntity findBuyerById(int buyerId) {
        return buyerRepository.findById(buyerId).orElse(null);
    }

    // Update an existing buyer
    public BuyerEntity updateBuyer(BuyerEntity buyer) {
        return buyerRepository.save(buyer);
    }

    // Delete a buyer by ID
    public void deleteBuyer(int buyerId) {
        buyerRepository.deleteById(buyerId);
    }

    // Optional: Get all buyers
    public List<BuyerEntity> findAllBuyers() {
        return buyerRepository.findAll();
    }
}
