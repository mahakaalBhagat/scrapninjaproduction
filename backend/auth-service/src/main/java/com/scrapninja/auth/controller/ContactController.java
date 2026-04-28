package com.scrapninja.auth.controller;

import com.scrapninja.auth.dto.ContactRequest;
import com.scrapninja.auth.event.ContactEvent;
import com.scrapninja.auth.event.EventProducer;
import com.scrapninja.auth.entity.ContactInquiry;
import com.scrapninja.auth.repository.ContactInquiryRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactInquiryRepository contactInquiryRepository;
    private final EventProducer eventProducer;

    @PostMapping
    public ResponseEntity<?> submitContactForm(@Valid @RequestBody ContactRequest request) {
        ContactInquiry inquiry = new ContactInquiry();
        inquiry.setFullName(request.getFullName());
        inquiry.setEmail(request.getEmail());
        inquiry.setPhone(request.getPhone());
        inquiry.setMessage(request.getMessage());
        inquiry.setStatus(ContactInquiry.Status.NEW);

        ContactInquiry saved = contactInquiryRepository.save(inquiry);

        // Publish Kafka event
        try {
            ContactEvent contactEvent = ContactEvent.builder()
                    .eventType("CONTACT_SUBMITTED")
                    .inquiryId(saved.getId().toString())
                    .fullName(saved.getFullName())
                    .email(saved.getEmail())
                    .phone(saved.getPhone())
                    .message(saved.getMessage())
                    .timestamp(LocalDateTime.now())
                    .build();
            eventProducer.publishContactEvent(contactEvent);
        } catch (Exception e) {
            // Don't fail the request if Kafka is down
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<ContactInquiry>> getAllInquiries() {
        List<ContactInquiry> inquiries = contactInquiryRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(inquiries);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<?> getByStatus(@PathVariable String status) {
        try {
            ContactInquiry.Status inquiryStatus = ContactInquiry.Status.valueOf(status.toUpperCase());
            List<ContactInquiry> inquiries = contactInquiryRepository.findByStatusOrderByCreatedAtDesc(inquiryStatus);
            return ResponseEntity.ok(inquiries);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid status. Allowed: NEW, READ, RESPONDED, CLOSED"));
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable UUID id, @RequestParam String status) {
        try {
            ContactInquiry.Status newStatus = ContactInquiry.Status.valueOf(status.toUpperCase());
            return contactInquiryRepository.findById(id)
                .map(inquiry -> {
                    inquiry.setStatus(newStatus);
                    ContactInquiry updated = contactInquiryRepository.save(inquiry);
                    return ResponseEntity.ok((Object) updated);
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Contact inquiry not found")));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid status. Allowed: NEW, READ, RESPONDED, CLOSED"));
        }
    }
}