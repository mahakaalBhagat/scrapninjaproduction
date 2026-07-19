package com.scrapninja.vendor.dto;

import java.time.LocalDateTime;

public class DocumentUploadResponse {
    private String documentId;
    private String fileName;
    private String documentType;
    private Long fileSize;
    private LocalDateTime uploadedAt;
    private String downloadUrl;
    
    public DocumentUploadResponse(String documentId, String fileName, String documentType, Long fileSize, LocalDateTime uploadedAt, String downloadUrl) {
        this.documentId = documentId;
        this.fileName = fileName;
        this.documentType = documentType;
        this.fileSize = fileSize;
        this.uploadedAt = uploadedAt;
        this.downloadUrl = downloadUrl;
    }
    
    public String getDocumentId() { return documentId; }
    public void setDocumentId(String documentId) { this.documentId = documentId; }
    
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    
    public String getDocumentType() { return documentType; }
    public void setDocumentType(String documentType) { this.documentType = documentType; }
    
    public Long getFileSize() { return fileSize; }
    public void setFileSize(Long fileSize) { this.fileSize = fileSize; }
    
    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
    
    public String getDownloadUrl() { return downloadUrl; }
    public void setDownloadUrl(String downloadUrl) { this.downloadUrl = downloadUrl; }
}
