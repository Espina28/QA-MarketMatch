package com.marketmatch.appdev.BackEnd.UserService;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.marketmatch.appdev.BackEnd.UserEntity.BuyEntity;
import com.marketmatch.appdev.BackEnd.UserEntity.BuyerEntity;
import com.marketmatch.appdev.BackEnd.UserEntity.ProductEntity;
import com.marketmatch.appdev.BackEnd.UserRepo.BuyRepo;
import com.marketmatch.appdev.BackEnd.UserRepo.BuyerRepo;
import com.marketmatch.appdev.BackEnd.UserRepo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.NameNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BuyService {

    @Autowired
    BuyRepo buy_repo;

    @Autowired
    BuyerRepo buyer_repo;

    @Autowired
    ProductRepo prod_repo;

    public List<BuyEntity> getAllBoughtItems(){
        return buy_repo.findAll();
    }


                                //when buyer buys a product this method expects the buyer pk
                                // and the product pk he chose, to create a buy entry
    public BuyEntity
    buyItem(HashMap<String, Object> payload){
        ObjectMapper mapper = new ObjectMapper();
//
//        // Extract the `productDetail` and `buyerDetail` objects from the payload
        int productPk = mapper.convertValue(payload.get("productDetail"), Integer.class);
        int buyerPk = mapper.convertValue(payload.get("buyerDetail"), Integer.class);

        String orderDate = mapper.convertValue(payload.get("orderDate"), String.class);
        int quantity = mapper.convertValue(payload.get("quantity"), Integer.class);
        double total = mapper.convertValue(payload.get("total"), Double.class);

        BuyerEntity buyer = buyer_repo.findById(buyerPk).get();
        ProductEntity product = prod_repo.findById(productPk).get();

        BuyEntity item = new BuyEntity();
        item.setBuyer(buyer);
        item.setProduct(product);
        item.setOrderDate(orderDate);
        item.setQuantity(quantity);
        item.setTotal(total);

        return buy_repo.save(item);
    }


    public BuyEntity editBoughtItem(int id, BuyEntity itemDetail) {
        BuyEntity newItem = new BuyEntity();

        try {
            newItem = buy_repo.findById(id).get();

            newItem.setOrderDate(itemDetail.getOrderDate());
//            newItem.setOrderRecieved(itemDetail.getOrderRecieved());
            newItem.setQuantity(itemDetail.getQuantity());
            newItem.setTotal(itemDetail.getTotal());
            newItem.setBuyer(itemDetail.getBuyer());
            newItem.setProduct(itemDetail.getProduct());

        } catch (NoSuchElementException err) {
            throw new NameNotFoundException("Not found");
        } finally {
            return buy_repo.save(newItem);
        }
    }

    public String deleteItem(int id){
        String msg ="";

        if(buy_repo.findById(id) != null) {
            buy_repo.deleteById(id);
            msg = "Item Record Deleted Successfully";
        }else{
            msg = id + "not found!";
        }
        return msg;
    }

}
