package com.scrapninja.enquiry.service;

import com.scrapninja.enquiry.dto.LeadRequest;
import com.scrapninja.enquiry.dto.LeadResponse;
import com.scrapninja.enquiry.entity.ChatLead;
import com.scrapninja.enquiry.repository.ChatLeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EnquiryService {

    private final ChatLeadRepository leadRepository;

    public LeadResponse saveLead(LeadRequest request, String ipAddress) {
        ChatLead lead = ChatLead.builder()
                .name(request.getName())
                .phone(request.getPhone())
                .source(request.getSource() != null ? request.getSource() : "CHATBOT")
                .flow(request.getFlow())
                .ipAddress(ipAddress)
                .build();

        ChatLead saved = leadRepository.save(lead);
        return toResponse(saved);
    }

    public Page<LeadResponse> getAllLeads(int page, int size) {
        return leadRepository
                .findAllByOrderByCreatedAtDesc(PageRequest.of(page, size))
                .map(this::toResponse);
    }

    public Page<LeadResponse> getLeadsByFlow(String flow, int page, int size) {
        return leadRepository
                .findByFlowOrderByCreatedAtDesc(flow, PageRequest.of(page, size))
                .map(this::toResponse);
    }

    public long countLeads() {
        return leadRepository.count();
    }

    private LeadResponse toResponse(ChatLead lead) {
        return LeadResponse.builder()
                .id(lead.getId())
                .name(lead.getName())
                .phone(lead.getPhone())
                .source(lead.getSource())
                .flow(lead.getFlow())
                .createdAt(lead.getCreatedAt())
                .build();
    }
}
