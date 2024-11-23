package com.marketmatch.appdev.BackEnd.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marketmatch.appdev.BackEnd.Entity.BHistoryEntity;
import com.marketmatch.appdev.BackEnd.Repository.BHistoryRepo;

@Service
public class BHistoryService {

    @Autowired
    private BHistoryRepo bHistoryRepo;

    public BHistoryEntity createBHistory(BHistoryEntity bHistory) {
        return bHistoryRepo.save(bHistory);
    }


    public List<BHistoryEntity> getHistoryByBuyerId(int buyerId) {
        return bHistoryRepo.findByBuyerId(buyerId); // Use the repository method to fetch data by buyerId
    }

    public BHistoryEntity deleteHistoryEntity(int id) {
        BHistoryEntity bHistoryEntity = bHistoryRepo.findById(id).orElse(null);
        if(bHistoryEntity!=null) {
            bHistoryRepo.delete(bHistoryEntity);
        }
        return bHistoryEntity;
    }
}
