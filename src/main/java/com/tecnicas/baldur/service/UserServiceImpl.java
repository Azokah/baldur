package com.tecnicas.baldur.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tecnicas.baldur.model.User;
import com.tecnicas.baldur.repository.UserRepository;

public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;
	
	@Override
	public User getUserById(long id) {
		Optional<User> u = userRepository.findById(id);
		if(u.isPresent())
			return u.get();
		else
			return null;
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

}
