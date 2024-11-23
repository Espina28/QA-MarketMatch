package com.marketmatch.appdev.BackEnd.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marketmatch.appdev.BackEnd.Entity.SHistoryEntity;
import com.marketmatch.appdev.BackEnd.Repository.SHistoryRepo;

@Service
public class SHistoryService {
    @Autowired
    private SHistoryRepo sHistoryRepo;


    public SHistoryEntity createSHistoryEntity(SHistoryEntity sHistoryEntity) {
        return sHistoryRepo.save(sHistoryEntity);
    }

    public List<SHistoryEntity> getHistoryBySellerId(int sellerId) {
        return sHistoryRepo.findBySellerId(sellerId); // Call the method in the repository
    }

    public SHistoryEntity deleteSHistoryEntity(int id) {
        SHistoryEntity sHistoryEntity = sHistoryRepo.findById(id).orElse(null);
        if (sHistoryEntity != null) {
            sHistoryRepo.delete(sHistoryEntity);
        }
        return sHistoryEntity;
    }


}
