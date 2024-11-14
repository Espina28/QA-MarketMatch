package com.marketmatch.appdev.BackEnd.UserEntity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;

//import java.awt.Image;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class UserEntity {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)	
private int userId;

//private Image image;

private String Firstname;
private String Lastname;
private String Address;
private String Phonenumber;
private String Student_Id;
private String email;
private String Password;
private String user_Type;
	
@JsonManagedReference
@OneToOne(mappedBy = "userid")
private SellerEntity seller_id;


@JsonManagedReference
@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
private BuyerEntity buyer;


public UserEntity() {
	super();
}


public int getUserId() {
	return userId;
}


public void setUserId(int userId) {
	this.userId = userId;
}


public String getFirstname() {
	return Firstname;
}


public void setFirstname(String firstname) {
	Firstname = firstname;
}


public String getLastname() {
	return Lastname;
}


public void setLastname(String lastname) {
	Lastname = lastname;
}


public String getAddress() {
	return Address;
}


public void setAddress(String address) {
	Address = address;
}


public String getPhonenumber() {
	return Phonenumber;
}


public void setPhonenumber(String phonenumber) {
	Phonenumber = phonenumber;
}


public String getStudent_Id() {
	return Student_Id;
}


public void setStudent_Id(String student_Id) {
	Student_Id = student_Id;
}


public String getEmail() {
	return email;
}


public void setEmail(String email) {
	this.email = email;
}


public String getPassword() {
	return Password;
}


public void setPassword(String password) {
	Password = password;
}


public String getUser_Type() {
	return user_Type;
}


public void setUser_Type(String user_Type) {
	this.user_Type = user_Type;
}


public SellerEntity getSeller_id() {
	return seller_id;
}


public void setSeller_id(SellerEntity seller_id) {
	this.seller_id = seller_id;
}


public BuyerEntity getBuyer() {
	return buyer;
}


public void setBuyer(BuyerEntity buyer) {
	this.buyer = buyer;
}


	
	
}
