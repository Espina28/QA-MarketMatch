package com.marketmatch.appdev.BackEnd.Entity;

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

@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
private BuyerEntity buyer;
private String Firstname;
private String Lastname;
private String Address;
private String Phonenumber;
private String Student_Id;
private String email;
private String Password;
	

//cons
public UserEntity() {
	super();
}

//
//public Image getImage() {
//	return image;
//}
//
//
//public void setImage(Image image) {
//	this.image = image;
//}


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

}
