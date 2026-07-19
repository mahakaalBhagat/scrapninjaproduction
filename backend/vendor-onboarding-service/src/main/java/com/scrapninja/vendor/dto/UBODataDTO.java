package com.scrapninja.vendor.dto;

public class UBODataDTO {
    private String beneficialOwnerName;
    private Double ownershipPercentage;
    private String nationality;
    private String passportNumber;
    
    public UBODataDTO() {}
    
    public UBODataDTO(String beneficialOwnerName, Double ownershipPercentage, String nationality, String passportNumber) {
        this.beneficialOwnerName = beneficialOwnerName;
        this.ownershipPercentage = ownershipPercentage;
        this.nationality = nationality;
        this.passportNumber = passportNumber;
    }
    
    public String getBeneficialOwnerName() { return beneficialOwnerName; }
    public void setBeneficialOwnerName(String beneficialOwnerName) { this.beneficialOwnerName = beneficialOwnerName; }
    
    public Double getOwnershipPercentage() { return ownershipPercentage; }
    public void setOwnershipPercentage(Double ownershipPercentage) { this.ownershipPercentage = ownershipPercentage; }
    
    public String getNationality() { return nationality; }
    public void setNationality(String nationality) { this.nationality = nationality; }
    
    public String getPassportNumber() { return passportNumber; }
    public void setPassportNumber(String passportNumber) { this.passportNumber = passportNumber; }
}
