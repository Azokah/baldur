package com.tecnicas.baldur;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import com.tecnicas.baldur.model.User;
import com.tecnicas.baldur.repository.UserRepository;

@SpringBootApplication(scanBasePackages={
"com.tecnicas.baldur.service"})
public class BaldurApplication {

	private static final Logger logger = LoggerFactory.getLogger(BaldurApplication.class);
	
	public static void main(String[] args) {
		SpringApplication.run(BaldurApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner setup(UserRepository employeeRepository) {
		return (args) -> {
			employeeRepository.save(new User("Gustavo", "Ponce", true));
			employeeRepository.save(new User("John", "Smith", true));
			employeeRepository.save(new User("Jim ", "Morrison", false));
			employeeRepository.save(new User("David", "Gilmour", true));
			logger.info("The sample data has been generated");
		};
}
}
