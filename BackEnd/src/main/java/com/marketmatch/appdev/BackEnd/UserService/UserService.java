package com.marketmatch.appdev.BackEnd.UserService;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.marketmatch.appdev.BackEnd.UserEntity.UserEntity;
import com.marketmatch.appdev.BackEnd.UserRepo.UserRepo;


@Service
public class UserService {

	@Autowired
	UserRepo urepo;

	@Autowired
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	

	public UserService(UserRepo urepo, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.urepo = urepo;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	//CRUD METHODS

	//add
	public UserEntity addUserRecord(UserEntity user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
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

	//Authenticate
	public boolean authenticate(String email, String password) {
		UserEntity user = urepo.findByEmail(email);
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
		return true;
	}

	
}
