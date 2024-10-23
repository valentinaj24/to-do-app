package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Dovoli CORS za vse API-je
                        .allowedOrigins("http://localhost:3000") // Dovoli zahteve iz frontend aplikacije
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Dovoli vse metode
                        .allowedHeaders("*") // Dovoli vse glave
                        .allowCredentials(true); // Dovoli prijave s piškotki (credentials)
            }
        };
    }
}
