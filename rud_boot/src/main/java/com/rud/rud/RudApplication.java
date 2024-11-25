package com.rud.rud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})

public class RudApplication {

	public static void main(String[] args) {
		SpringApplication.run(RudApplication.class, args);
	}

}