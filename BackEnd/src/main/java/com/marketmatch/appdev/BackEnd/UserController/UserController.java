package com.marketmatch.appdev.BackEnd.UserController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.marketmatch.appdev.BackEnd.UserEntity.UserEntity;
import com.marketmatch.appdev.BackEnd.UserService.UserService;



@CrossOrigin(origins = "http://localhost:5173")


@RestController
@RequestMapping("/api/user")
public class UserController {

@Autowired
UserService userv;
	
@PostMapping("/postUser")
public UserEntity postCourse(@RequestBody UserEntity user) {
	return userv.addUserRecord(user);
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



	
}
