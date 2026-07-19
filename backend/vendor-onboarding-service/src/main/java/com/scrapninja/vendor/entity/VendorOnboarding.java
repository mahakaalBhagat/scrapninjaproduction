package com.scrapninja.vendor.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "vendor_onboarding")
public class VendorOnboarding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Long userId;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OnboardingStatus status; // Draft, Pending Review, Under Verification, Approved, Rejected
    
    @Column(nullable = false)
    private Integer currentStep;
    
    // Step 1: Business Verification
    private String companyLegalName;
    private String businessRegistrationNumber;
    private String tradeLicenseNumber;
    private LocalDate tradeLicenseExpiryDate;
    private String registeredBusinessAddress;
    private String mainlandFreeZoneStatus;
    private String tradeLicenseDocumentId;
    
    // Step 2: Scrap Trading Authorization
    private String tradingActivityTypes; // JSON array stored as string
    private String supportingLicenseDocumentId;
    
    // Step 3: Company KYC/KYB
    private String directorOwnerFullName;
    private String directorPassportNumber;
    private String directorPassportDocumentId;
    private String emiratesIdNumber;
    private String emiratesIdDocumentId;
    private String certificateOfIncorporationDocumentId;
    private String moaDocumentId;
    private String authorizedSignatoryName;
    private String authorizedSignatoryDesignation;
    
    // Step 4: UBO Declaration
    private String uboDataJson; // JSON for multiple UBOs
    private String ownershipStructureChartDocumentId;
    private String uboDeclarationDocumentId;
    
    // Step 5: Tax Compliance
    private Boolean vatRegistered;
    private String vatrn;
    private String vatRegistrationCertificateDocumentId;
    
    // Step 6: Banking Verification
    private String bankName;
    private String accountHolderName;
    private String accountNumber;
    private String ibanNumber;
    private String swiftCode;
    private String cancelledChequeDocumentId;
    private String bankVerificationLetterDocumentId;
    
    // Step 7: Scrap Source Declaration
    private String sourceOfScrap;
    private String typesOfScrapTraded; // JSON array
    private Boolean importStatus;
    private Boolean exportStatus;
    private String originType;
    private Boolean scrapLegalSourceDeclaration;
    
    // Step 8: Environmental Compliance
    private Boolean environmentalPermitAvailable;
    private Boolean wasteManagementPermitAvailable;
    private Boolean municipalityApprovalAvailable;
    private String environmentalPermitDocumentId;
    private String wasteManagementPermitDocumentId;
    private String municipalityApprovalDocumentId;
    
    // Step 9: Operational Verification
    private String warehouseYardAddress;
    private String googleMapsLocationUrl;
    private String primaryContactPerson;
    private String contactNumber;
    private String companyEmail;
    private String companyWebsite;
    private String facilityPhotosDocumentIds; // JSON array
    
    // Step 10: Vendor Agreement
    private Boolean antiFraudPolicyAccepted;
    private Boolean complianceWithLocalLawsAccepted;
    private Boolean noStolenIllegalScrapAccepted;
    private Boolean disputeResolutionAccepted;
    private Boolean scrapNinjaCommercialTermsAccepted;
    private String signatureType; // "typed" or "uploaded"
    private String typedSignature;
    private String signatureUploadDocumentId;
    
    // Status tracking
    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;
    
    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;
    
    private LocalDateTime submittedAt;
    private LocalDateTime approvedAt;
    private LocalDateTime rejectedAt;
    
    private String rejectionReason;
    private String adminNotes;
    private Long adminReviewerId;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public OnboardingStatus getStatus() { return status; }
    public void setStatus(OnboardingStatus status) { this.status = status; }
    
    public Integer getCurrentStep() { return currentStep; }
    public void setCurrentStep(Integer currentStep) { this.currentStep = currentStep; }
    
    public String getCompanyLegalName() { return companyLegalName; }
    public void setCompanyLegalName(String companyLegalName) { this.companyLegalName = companyLegalName; }
    
    public String getBusinessRegistrationNumber() { return businessRegistrationNumber; }
    public void setBusinessRegistrationNumber(String businessRegistrationNumber) { this.businessRegistrationNumber = businessRegistrationNumber; }
    
    public String getTradeLicenseNumber() { return tradeLicenseNumber; }
    public void setTradeLicenseNumber(String tradeLicenseNumber) { this.tradeLicenseNumber = tradeLicenseNumber; }
    
    public LocalDate getTradeLicenseExpiryDate() { return tradeLicenseExpiryDate; }
    public void setTradeLicenseExpiryDate(LocalDate tradeLicenseExpiryDate) { this.tradeLicenseExpiryDate = tradeLicenseExpiryDate; }
    
    public String getRegisteredBusinessAddress() { return registeredBusinessAddress; }
    public void setRegisteredBusinessAddress(String registeredBusinessAddress) { this.registeredBusinessAddress = registeredBusinessAddress; }
    
    public String getMainlandFreeZoneStatus() { return mainlandFreeZoneStatus; }
    public void setMainlandFreeZoneStatus(String mainlandFreeZoneStatus) { this.mainlandFreeZoneStatus = mainlandFreeZoneStatus; }
    
    public String getTradeLicenseDocumentId() { return tradeLicenseDocumentId; }
    public void setTradeLicenseDocumentId(String tradeLicenseDocumentId) { this.tradeLicenseDocumentId = tradeLicenseDocumentId; }
    
    public String getTradingActivityTypes() { return tradingActivityTypes; }
    public void setTradingActivityTypes(String tradingActivityTypes) { this.tradingActivityTypes = tradingActivityTypes; }
    
    public String getSupportingLicenseDocumentId() { return supportingLicenseDocumentId; }
    public void setSupportingLicenseDocumentId(String supportingLicenseDocumentId) { this.supportingLicenseDocumentId = supportingLicenseDocumentId; }
    
    public String getDirectorOwnerFullName() { return directorOwnerFullName; }
    public void setDirectorOwnerFullName(String directorOwnerFullName) { this.directorOwnerFullName = directorOwnerFullName; }
    
    public String getDirectorPassportNumber() { return directorPassportNumber; }
    public void setDirectorPassportNumber(String directorPassportNumber) { this.directorPassportNumber = directorPassportNumber; }
    
    public String getDirectorPassportDocumentId() { return directorPassportDocumentId; }
    public void setDirectorPassportDocumentId(String directorPassportDocumentId) { this.directorPassportDocumentId = directorPassportDocumentId; }
    
    public String getEmiratesIdNumber() { return emiratesIdNumber; }
    public void setEmiratesIdNumber(String emiratesIdNumber) { this.emiratesIdNumber = emiratesIdNumber; }
    
    public String getEmiratesIdDocumentId() { return emiratesIdDocumentId; }
    public void setEmiratesIdDocumentId(String emiratesIdDocumentId) { this.emiratesIdDocumentId = emiratesIdDocumentId; }
    
    public String getCertificateOfIncorporationDocumentId() { return certificateOfIncorporationDocumentId; }
    public void setCertificateOfIncorporationDocumentId(String certificateOfIncorporationDocumentId) { this.certificateOfIncorporationDocumentId = certificateOfIncorporationDocumentId; }
    
    public String getMoaDocumentId() { return moaDocumentId; }
    public void setMoaDocumentId(String moaDocumentId) { this.moaDocumentId = moaDocumentId; }
    
    public String getAuthorizedSignatoryName() { return authorizedSignatoryName; }
    public void setAuthorizedSignatoryName(String authorizedSignatoryName) { this.authorizedSignatoryName = authorizedSignatoryName; }
    
    public String getAuthorizedSignatoryDesignation() { return authorizedSignatoryDesignation; }
    public void setAuthorizedSignatoryDesignation(String authorizedSignatoryDesignation) { this.authorizedSignatoryDesignation = authorizedSignatoryDesignation; }
    
    public String getUboDataJson() { return uboDataJson; }
    public void setUboDataJson(String uboDataJson) { this.uboDataJson = uboDataJson; }
    
    public String getOwnershipStructureChartDocumentId() { return ownershipStructureChartDocumentId; }
    public void setOwnershipStructureChartDocumentId(String ownershipStructureChartDocumentId) { this.ownershipStructureChartDocumentId = ownershipStructureChartDocumentId; }
    
    public String getUboDeclarationDocumentId() { return uboDeclarationDocumentId; }
    public void setUboDeclarationDocumentId(String uboDeclarationDocumentId) { this.uboDeclarationDocumentId = uboDeclarationDocumentId; }
    
    public Boolean getVatRegistered() { return vatRegistered; }
    public void setVatRegistered(Boolean vatRegistered) { this.vatRegistered = vatRegistered; }
    
    public String getVatrn() { return vatrn; }
    public void setVatrn(String vatrn) { this.vatrn = vatrn; }
    
    public String getVatRegistrationCertificateDocumentId() { return vatRegistrationCertificateDocumentId; }
    public void setVatRegistrationCertificateDocumentId(String vatRegistrationCertificateDocumentId) { this.vatRegistrationCertificateDocumentId = vatRegistrationCertificateDocumentId; }
    
    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }
    
    public String getAccountHolderName() { return accountHolderName; }
    public void setAccountHolderName(String accountHolderName) { this.accountHolderName = accountHolderName; }
    
    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }
    
    public String getIbanNumber() { return ibanNumber; }
    public void setIbanNumber(String ibanNumber) { this.ibanNumber = ibanNumber; }
    
    public String getSwiftCode() { return swiftCode; }
    public void setSwiftCode(String swiftCode) { this.swiftCode = swiftCode; }
    
    public String getCancelledChequeDocumentId() { return cancelledChequeDocumentId; }
    public void setCancelledChequeDocumentId(String cancelledChequeDocumentId) { this.cancelledChequeDocumentId = cancelledChequeDocumentId; }
    
    public String getBankVerificationLetterDocumentId() { return bankVerificationLetterDocumentId; }
    public void setBankVerificationLetterDocumentId(String bankVerificationLetterDocumentId) { this.bankVerificationLetterDocumentId = bankVerificationLetterDocumentId; }
    
    public String getSourceOfScrap() { return sourceOfScrap; }
    public void setSourceOfScrap(String sourceOfScrap) { this.sourceOfScrap = sourceOfScrap; }
    
    public String getTypesOfScrapTraded() { return typesOfScrapTraded; }
    public void setTypesOfScrapTraded(String typesOfScrapTraded) { this.typesOfScrapTraded = typesOfScrapTraded; }
    
    public Boolean getImportStatus() { return importStatus; }
    public void setImportStatus(Boolean importStatus) { this.importStatus = importStatus; }
    
    public Boolean getExportStatus() { return exportStatus; }
    public void setExportStatus(Boolean exportStatus) { this.exportStatus = exportStatus; }
    
    public String getOriginType() { return originType; }
    public void setOriginType(String originType) { this.originType = originType; }
    
    public Boolean getScrapLegalSourceDeclaration() { return scrapLegalSourceDeclaration; }
    public void setScrapLegalSourceDeclaration(Boolean scrapLegalSourceDeclaration) { this.scrapLegalSourceDeclaration = scrapLegalSourceDeclaration; }
    
    public Boolean getEnvironmentalPermitAvailable() { return environmentalPermitAvailable; }
    public void setEnvironmentalPermitAvailable(Boolean environmentalPermitAvailable) { this.environmentalPermitAvailable = environmentalPermitAvailable; }
    
    public Boolean getWasteManagementPermitAvailable() { return wasteManagementPermitAvailable; }
    public void setWasteManagementPermitAvailable(Boolean wasteManagementPermitAvailable) { this.wasteManagementPermitAvailable = wasteManagementPermitAvailable; }
    
    public Boolean getMunicipalityApprovalAvailable() { return municipalityApprovalAvailable; }
    public void setMunicipalityApprovalAvailable(Boolean municipalityApprovalAvailable) { this.municipalityApprovalAvailable = municipalityApprovalAvailable; }
    
    public String getEnvironmentalPermitDocumentId() { return environmentalPermitDocumentId; }
    public void setEnvironmentalPermitDocumentId(String environmentalPermitDocumentId) { this.environmentalPermitDocumentId = environmentalPermitDocumentId; }
    
    public String getWasteManagementPermitDocumentId() { return wasteManagementPermitDocumentId; }
    public void setWasteManagementPermitDocumentId(String wasteManagementPermitDocumentId) { this.wasteManagementPermitDocumentId = wasteManagementPermitDocumentId; }
    
    public String getMunicipalityApprovalDocumentId() { return municipalityApprovalDocumentId; }
    public void setMunicipalityApprovalDocumentId(String municipalityApprovalDocumentId) { this.municipalityApprovalDocumentId = municipalityApprovalDocumentId; }
    
    public String getWarehouseYardAddress() { return warehouseYardAddress; }
    public void setWarehouseYardAddress(String warehouseYardAddress) { this.warehouseYardAddress = warehouseYardAddress; }
    
    public String getGoogleMapsLocationUrl() { return googleMapsLocationUrl; }
    public void setGoogleMapsLocationUrl(String googleMapsLocationUrl) { this.googleMapsLocationUrl = googleMapsLocationUrl; }
    
    public String getPrimaryContactPerson() { return primaryContactPerson; }
    public void setPrimaryContactPerson(String primaryContactPerson) { this.primaryContactPerson = primaryContactPerson; }
    
    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
    
    public String getCompanyEmail() { return companyEmail; }
    public void setCompanyEmail(String companyEmail) { this.companyEmail = companyEmail; }
    
    public String getCompanyWebsite() { return companyWebsite; }
    public void setCompanyWebsite(String companyWebsite) { this.companyWebsite = companyWebsite; }
    
    public String getFacilityPhotosDocumentIds() { return facilityPhotosDocumentIds; }
    public void setFacilityPhotosDocumentIds(String facilityPhotosDocumentIds) { this.facilityPhotosDocumentIds = facilityPhotosDocumentIds; }
    
    public Boolean getAntiFraudPolicyAccepted() { return antiFraudPolicyAccepted; }
    public void setAntiFraudPolicyAccepted(Boolean antiFraudPolicyAccepted) { this.antiFraudPolicyAccepted = antiFraudPolicyAccepted; }
    
    public Boolean getComplianceWithLocalLawsAccepted() { return complianceWithLocalLawsAccepted; }
    public void setComplianceWithLocalLawsAccepted(Boolean complianceWithLocalLawsAccepted) { this.complianceWithLocalLawsAccepted = complianceWithLocalLawsAccepted; }
    
    public Boolean getNoStolenIllegalScrapAccepted() { return noStolenIllegalScrapAccepted; }
    public void setNoStolenIllegalScrapAccepted(Boolean noStolenIllegalScrapAccepted) { this.noStolenIllegalScrapAccepted = noStolenIllegalScrapAccepted; }
    
    public Boolean getDisputeResolutionAccepted() { return disputeResolutionAccepted; }
    public void setDisputeResolutionAccepted(Boolean disputeResolutionAccepted) { this.disputeResolutionAccepted = disputeResolutionAccepted; }
    
    public Boolean getScrapNinjaCommercialTermsAccepted() { return scrapNinjaCommercialTermsAccepted; }
    public void setScrapNinjaCommercialTermsAccepted(Boolean scrapNinjaCommercialTermsAccepted) { this.scrapNinjaCommercialTermsAccepted = scrapNinjaCommercialTermsAccepted; }
    
    public String getSignatureType() { return signatureType; }
    public void setSignatureType(String signatureType) { this.signatureType = signatureType; }
    
    public String getTypedSignature() { return typedSignature; }
    public void setTypedSignature(String typedSignature) { this.typedSignature = typedSignature; }
    
    public String getSignatureUploadDocumentId() { return signatureUploadDocumentId; }
    public void setSignatureUploadDocumentId(String signatureUploadDocumentId) { this.signatureUploadDocumentId = signatureUploadDocumentId; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
    
    public LocalDateTime getApprovedAt() { return approvedAt; }
    public void setApprovedAt(LocalDateTime approvedAt) { this.approvedAt = approvedAt; }
    
    public LocalDateTime getRejectedAt() { return rejectedAt; }
    public void setRejectedAt(LocalDateTime rejectedAt) { this.rejectedAt = rejectedAt; }
    
    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }
    
    public String getAdminNotes() { return adminNotes; }
    public void setAdminNotes(String adminNotes) { this.adminNotes = adminNotes; }
    
    public Long getAdminReviewerId() { return adminReviewerId; }
    public void setAdminReviewerId(Long adminReviewerId) { this.adminReviewerId = adminReviewerId; }
}
