package com.marketmatch.appdev.BackEnd.UserService;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marketmatch.appdev.BackEnd.UserEntity.UserEntity;
import com.marketmatch.appdev.BackEnd.UserRepo.UserRepo;


@Service
public class UserService {

@Autowired
UserRepo urepo;




public UserService() {
	super();
}

//CRUD METHODS

//add
public UserEntity addUserRecord(UserEntity user) {
	return urepo.save(user);
}

//read
public List<UserEntity> readUsers(){
	return urepo.findAll();
}

//update
@SuppressWarnings("finally")
public UserEntity putUserDetails(int id, UserEntity newUserDetails) {
	UserEntity user = new UserEntity();
	
	
	try {
		//student baryabol
		user = urepo.findById(id).get();
		
		
	    //settingnimplementation
//		user.setImage(newUserDetails.getImage());
		user.setFirstname(newUserDetails.getFirstname());
		user.setLastname(newUserDetails.getLastname());
		user.setAddress(newUserDetails.getAddress());
		user.setPhonenumber(newUserDetails.getPhonenumber());
		user.setStudent_Id(newUserDetails.getStudent_Id());
		user.setEmail(newUserDetails.getEmail());
		user.setPassword(newUserDetails.getPassword());
		user.setUser_Type(newUserDetails.getUser_Type());
		
		
		
	}catch(NoSuchElementException nex) {
		throw new NameNotFoundException("User " + id + " not found");
	}finally {
		return urepo.save(user);
	}

}//end of update method

//delete	
@SuppressWarnings({ "unused" })
	public String deleteUser(int id) {
		String msg="";
		
		if(urepo.findById(id)!=null) {
			urepo.deleteById(id);
			msg = "User Record successfully deleted";
		}else {
			msg = id + "NOT found";
		}
		
		return msg;
	}


	
}
