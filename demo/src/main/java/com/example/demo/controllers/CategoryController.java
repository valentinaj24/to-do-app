package com.example.demo.controllers;

import com.example.demo.models.Category;
import com.example.demo.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")  // Prepričaj se, da dovoliš CORS za frontend
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Preberi vse kategorije
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }
}

