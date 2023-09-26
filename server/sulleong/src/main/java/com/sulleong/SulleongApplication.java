package com.sulleong;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class SulleongApplication {

	public static void main(String[] args) {
		SpringApplication.run(SulleongApplication.class, args);
	}

}
