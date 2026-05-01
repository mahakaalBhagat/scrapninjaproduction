package com.scrapninja.enquiry.controller;

import com.scrapninja.enquiry.dto.LeadRequest;
import com.scrapninja.enquiry.dto.LeadResponse;
import com.scrapninja.enquiry.service.EnquiryService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost", "http://localhost:3000", "http://localhost:3001",
        "http://127.0.0.1", "http://127.0.0.1:3000",
        "https://goscrapninja.com", "https://www.goscrapninja.com"})
public class EnquiryController {

    private final EnquiryService enquiryService;

    /** POST /api/leads — save a chatbot lead (no auth required) */
    @PostMapping("/leads")
    public ResponseEntity<LeadResponse> captureLead(
            @Valid @RequestBody LeadRequest request,
            HttpServletRequest httpRequest) {

        String ip = getClientIp(httpRequest);
        LeadResponse response = enquiryService.saveLead(request, ip);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /** GET /api/leads — admin: list all leads paginated */
    @GetMapping("/leads")
    public ResponseEntity<Page<LeadResponse>> getAllLeads(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {

        return ResponseEntity.ok(enquiryService.getAllLeads(page, size));
    }

    /** GET /api/leads/by-flow?flow=HOW_TO_SELL — filter by chatbot flow */
    @GetMapping("/leads/by-flow")
    public ResponseEntity<Page<LeadResponse>> getLeadsByFlow(
            @RequestParam String flow,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {

        return ResponseEntity.ok(enquiryService.getLeadsByFlow(flow, page, size));
    }

    /** GET /api/leads/stats — total count */
    @GetMapping("/leads/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(Map.of(
                "totalLeads", enquiryService.countLeads(),
                "service", "Enquiry Service"
        ));
    }

    /** GET /api/leads/health */
    @GetMapping("/leads/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "Enquiry Service"));
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
