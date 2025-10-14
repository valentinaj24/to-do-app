package com.example.demo.config;

import com.example.demo.models.Category;
import com.example.demo.repositories.CategoryRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {
    @Bean
    ApplicationRunner seedCategories(CategoryRepository repo) {
        return args -> {
            String[] defaults = {"Personal", "Work"};
            for (String n : defaults) {
                if (!repo.existsByName(n)) {
                    repo.save(new Category(n));
                }
            }
        };
    }
}

