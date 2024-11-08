package com.marketmatch.appdev.BackEnd.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.marketmatch.appdev.BackEnd.Entity.LoginRequest;
import com.marketmatch.appdev.BackEnd.Entity.UserEntity;
import com.marketmatch.appdev.BackEnd.Service.UserService;

import jakarta.servlet.http.HttpSession;





@RestController
@RequestMapping("/api/user")
public class UserController {

@Autowired
UserService userv;
	
@PostMapping("/postUser")
public ResponseEntity<UserEntity> postCourse(@RequestBody UserEntity user) {
	UserEntity newUser = userv.addUserRecord(user);
	return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
}


@GetMapping("/getUser")
public List<UserEntity> getUser(){
	return userv.readUsers();
}

@PutMapping("/updateUser")
public UserEntity updateUser( @RequestParam  int id, @RequestBody UserEntity user) {
	return userv.putUserDetails(id,user);
}


@DeleteMapping("/deleteUser")
public String deleteUser(@PathVariable int id) {
	return userv.deleteUser(id);
}

@PostMapping("/login")
public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest,HttpSession session) {
    try{
		boolean isAuth = userv.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
		if (isAuth) {
			session.setAttribute("email", loginRequest.getEmail());
			return ResponseEntity.ok("Login Successful");
		}
		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login Failed");
		}
	}catch(Exception e) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login Failed");
	}
}


	
}
