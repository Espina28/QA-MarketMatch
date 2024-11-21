package com.marketmatch.appdev.BackEnd.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.marketmatch.appdev.BackEnd.Entity.BuyEntity;
import com.marketmatch.appdev.BackEnd.Entity.BuyerEntity;
import com.marketmatch.appdev.BackEnd.Entity.ProductEntity;
import com.marketmatch.appdev.BackEnd.Repository.BuyRepo;
import com.marketmatch.appdev.BackEnd.Repository.BuyerRepo;
import com.marketmatch.appdev.BackEnd.Repository.ProductRepo;
import com.marketmatch.appdev.BackEnd.Repository.UserRepo;
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
    UserRepo user_repo;

    @Autowired
    ProductRepo prod_repo;

    public List<BuyEntity> getAllBoughtItems(){
        return buy_repo.findAll();
    }


                                //when buyer buys a product this method expects the buyer pk
                                // and the product pk he chose, to create a buy entry
//     public BuyEntity
//     buyItem(HashMap<String, Object> payload){
//         ObjectMapper mapper = new ObjectMapper();
// //
// //        // Extract the `productDetail` and `buyerDetail` objects from the payload
//         int productPk = mapper.convertValue(payload.get("productDetail"), Integer.class);
//         int buyerPk = mapper.convertValue(payload.get("buyerDetail"), Integer.class);

//         String orderDate = mapper.convertValue(payload.get("orderDate"), String.class);
//         int quantity = mapper.convertValue(payload.get("quantity"), Integer.class);
//         double total = mapper.convertValue(payload.get("total"), Double.class);

//         BuyerEntity buyer = buyer_repo.findByBuyerId(buyerPk);
//         ProductEntity product = prod_repo.findById(productPk).get();

//         BuyEntity item = new BuyEntity();
//         item.setBuyer(buyer);
//         item.setProduct(product);
//         item.setOrderDate(orderDate);
//         item.setQuantity(quantity);
//         item.setTotal(total);

//         return buy_repo.save(item);
//     }



// did it in the front end now backend only expects a BuyEntity
    public BuyEntity buyItem(BuyEntity payload){
        return buy_repo.save(payload);
    }

    public List<BuyEntity> getPurchased(int id){
        return buy_repo.findBuyerItems(id);
    }

    public BuyEntity editBoughtItem(int id, BuyEntity itemDetail) {
        BuyEntity newItem = new BuyEntity();

        try {
            newItem = buy_repo.findById(id).get();

            newItem.setOrderDate(itemDetail.getOrderDate());
//            newItem.setOrderRecieved(itemDetail.getOrderRecieved());
            newItem.setQuantity(itemDetail.getQuantity());
            newItem.setTotal(itemDetail.getTotal());

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
