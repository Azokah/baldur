package com.tecnicas.baldur.service;

import java.util.List;

import com.tecnicas.baldur.model.User;

public interface UserService {
	User getUserById(long id);
	List<User> getAllUsers();
}
