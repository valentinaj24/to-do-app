package com.example.demo.dto;

public class AttachmentDTO {
    private Long id;
    private String fileName;

    // Constructor
    public AttachmentDTO(Long id, String fileName) {
        this.id = id;
        this.fileName = fileName;
    }

    // Getters i Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
}
