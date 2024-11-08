package com.marketmatch.appdev.BackEnd.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.marketmatch.appdev.BackEnd.Entity.UserEntity;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Integer> {
	public UserEntity findByEmail(String email);
}
