package com.marketmatch.appdev.BackEnd.UserController;

import java.nio.file.attribute.UserPrincipal;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.marketmatch.appdev.BackEnd.UserEntity.LoginRequest;
import com.marketmatch.appdev.BackEnd.UserEntity.UserEntity;
import com.marketmatch.appdev.BackEnd.UserService.TokenService;
import com.marketmatch.appdev.BackEnd.UserService.UserService;

import jakarta.servlet.http.HttpSession;






@RestController
@RequestMapping("/api/user")
public class UserController {

@Autowired
UserService userv;

private final TokenService tokenService;


public UserController(TokenService tokenService) {
	this.tokenService = tokenService;
}


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
			UserEntity user = userv.getUserByEmail(loginRequest.getEmail());
			Authentication authentication = new UsernamePasswordAuthenticationToken(user,null,Collections.emptyList());
			String jwtToken = tokenService.generateToken(authentication);
			session.setAttribute("id", user.getUserId());
			session.setAttribute("email", loginRequest.getEmail());
			return ResponseEntity.ok(jwtToken);
		}
		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login Failed at authentication");
		}
	}catch(Exception e) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login Failed at start");
	}
}

@PostMapping("/setIDsession")
public ResponseEntity<String> setIDsession(@RequestBody LoginRequest loginRequest,HttpSession session) {
	try {
		boolean isAuth = userv.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
		if(isAuth) {
			UserEntity user = userv.getUserByEmail(loginRequest.getEmail());
			return ResponseEntity.ok(String.valueOf(user.getUserId()));
		}else{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login Failed at authentication");
		}
	} catch (Exception e) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to set ID in session");
	}
}


@PostMapping("/logout")
public ResponseEntity<String> logout(HttpSession session) {
	session.invalidate();
	return ResponseEntity.ok("Logout successful");
}


	
}
