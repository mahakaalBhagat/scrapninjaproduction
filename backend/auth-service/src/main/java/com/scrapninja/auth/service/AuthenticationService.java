package com.scrapninja.auth.service;

import com.scrapninja.auth.dto.AuthResponse;
import com.scrapninja.auth.event.EventProducer;
import com.scrapninja.auth.event.UserEvent;
import com.scrapninja.auth.entity.User;
import com.scrapninja.auth.repository.UserRepository;
import com.scrapninja.auth.security.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Slf4j
@Transactional
public class AuthenticationService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final EventProducer eventProducer;

    public AuthenticationService(
            UserRepository userRepository,
            JwtTokenProvider jwtTokenProvider,
            PasswordEncoder passwordEncoder,
            EventProducer eventProducer) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
        this.eventProducer = eventProducer;
    }

    public AuthResponse register(String email, String password, String firstName,
                                  String lastName, User.UserType userType) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already registered");
        }

        String hashedPassword = passwordEncoder.encode(password);

        User user = User.builder()
            .email(email)
            .passwordHash(hashedPassword)
            .firstName(firstName)
            .lastName(lastName)
            .userType(userType != null ? userType : User.UserType.HOUSEHOLD)
            .isVerified(false)
            .isActive(true)
            .build();

        user = userRepository.save(user);
        log.info("New user registered with email: {}", email);

        // Publish Kafka event
        try {
            UserEvent userEvent = UserEvent.builder()
                    .eventType("USER_REGISTERED")
                    .userId(user.getId().toString())
                    .email(user.getEmail())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .userType(user.getUserType().name())
                    .timestamp(LocalDateTime.now())
                    .build();
            eventProducer.publishUserEvent(userEvent);
        } catch (Exception e) {
            log.warn("Failed to publish USER_REGISTERED event: {}", e.getMessage());
        }

        String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getId(), user.getEmail());

        return AuthResponse.builder()
            .token(token)
            .refreshToken(refreshToken)
            .userId(user.getId().toString())
            .email(user.getEmail())
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .userType(user.getUserType() != null ? user.getUserType().name() : "HOUSEHOLD")
            .expiresIn(86400L)
            .build();
    }

    public AuthResponse login(String email, String password) {
        User user = userRepository.findActiveUserByEmail(email)
            .orElseThrow(() -> {
                log.warn("Login attempt with invalid email: {}", email);
                return new IllegalArgumentException("Invalid email or password");
            });

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            log.warn("Login attempt with invalid password for email: {}", email);
            throw new IllegalArgumentException("Invalid email or password");
        }

        log.info("User logged in successfully: {}", email);

        String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getId(), user.getEmail());

        return AuthResponse.builder()
            .token(token)
            .refreshToken(refreshToken)
            .userId(user.getId().toString())
            .email(user.getEmail())
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .userType(user.getUserType() != null ? user.getUserType().name() : "HOUSEHOLD")
            .expiresIn(86400L)
            .build();
    }

    public AuthResponse refreshToken(String refreshToken) {
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new IllegalArgumentException("Invalid or expired refresh token");
        }

        String email = jwtTokenProvider.getEmailFromToken(refreshToken);
        UUID userId = jwtTokenProvider.getUserIdFromToken(refreshToken);

        if (email == null || userId == null) {
            throw new IllegalArgumentException("Invalid token claims");
        }

        String newToken = jwtTokenProvider.generateToken(userId, email);

        return AuthResponse.builder()
            .token(newToken)
            .expiresIn(86400L)
            .build();
    }

    public boolean validateToken(String token) {
        return jwtTokenProvider.validateToken(token);
    }

    @Transactional(readOnly = true)
    public User getUserById(UUID userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @Transactional(readOnly = true)
    public User getUserByEmail(String email) {
        return userRepository.findUserByEmailAndNotDeleted(email)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public UUID getUserIdFromToken(String token) {
        return jwtTokenProvider.getUserIdFromToken(token);
    }
}