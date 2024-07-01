package com.example;

import com.example.model.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SpringTransactionManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringTransactionManagementApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(UserService userService) {
        return args -> {
            userService.createUser("Rupam Barui");
            userService.createUser("Oishiki Mondal");
            userService.createUser("Satyam Kumar Prasad");
            userService.createUser("Aviral Kaintura");
            userService.createUser("Kushagra Singh");
            User user1 = userService.getUser(1L);
            User user2 = userService.getUser(2L);
            User user3 = userService.getUser(3L);
            User user4 = userService.getUser(4L);
            User user5 = userService.getUser(5L);
            System.out.println("User List : ");
            System.out.println("User 1: " + user1.getName());
            System.out.println("User 2: " + user2.getName());
            System.out.println("User 3: " + user3.getName());
            System.out.println("User 4: " + user4.getName());
            System.out.println("User 5: " + user5.getName());
        };
    }
}