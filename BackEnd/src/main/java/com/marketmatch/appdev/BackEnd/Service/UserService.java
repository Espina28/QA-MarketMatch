package com.marketmatch.appdev.BackEnd.Service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import com.marketmatch.appdev.BackEnd.DTO.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.marketmatch.appdev.BackEnd.Entity.UserEntity;
import com.marketmatch.appdev.BackEnd.Repository.UserRepo;


@Service
public class UserService {

	@Autowired
	UserRepo urepo;

	@Autowired
	BuyerService buyer_serv;

	@Autowired
	private final BCryptPasswordEncoder bCryptPasswordEncoder;


	

	public UserService(UserRepo urepo, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.urepo = urepo;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	//CRUD METHODS
	//add user
	//DTO filter outs the data that is only need in frontend,
	//crucial data like primary key and password will not be included
	public Account addUserRecord(UserEntity details){
		UserEntity newUser = urepo.save(details);
		newUser.setPassword(bCryptPasswordEncoder.encode(details.getPassword()));
		newUser.setBuyer(buyer_serv.createNewBuyer(newUser));

		Account account = new Account();
		account.setFirstname(newUser.getFirstname());
		account.setLastname(newUser.getLastname());
		account.setEmail(newUser.getEmail());
		account.setAddress(newUser.getAddress());
		account.setPhoneNumber(newUser.getPhonenumber());
		account.setStudentId(newUser.getStudent_Id());

		return account;
	}

//	//add
//	public UserEntity addUserRecord(UserEntity user) {
//		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
//		return urepo.save(user);
//	}

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

	//Authenticate
	public Account authenticate(String email, String password) {
		UserEntity user = urepo.findByEmail(email);

		Account account = new Account();
		account.setFirstname(user.getFirstname());
		account.setLastname(user.getLastname());
		account.setEmail(user.getEmail());
		account.setAddress(user.getAddress());
		account.setPhoneNumber(user.getPhonenumber());
		account.setStudentId(user.getStudent_Id());
		if (user == null) {
			throw new BadCredentialsException("email not found");
		}
		System.out.println("User found: " + user.getEmail());
		if(!user.getEmail().equals(email)){
			throw new BadCredentialsException("email not found");
		}
		if (!bCryptPasswordEncoder.matches(password, user.getPassword())) {
			throw new BadCredentialsException("password is incorrect");
		}
		return account;
	}

	
}
