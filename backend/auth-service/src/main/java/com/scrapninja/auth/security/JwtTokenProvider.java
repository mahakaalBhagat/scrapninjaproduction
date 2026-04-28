package com.scrapninja.auth.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
@Slf4j
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    public String generateToken(UUID userId, String email) {
        return generateToken(userId, email, new HashMap<>());
    }

    public String generateToken(UUID userId, String email, Map<String, Object> claims) {
        if (claims == null) {
            claims = new HashMap<>();
        }
        claims.put("userId", userId.toString());
        claims.put("email", email);

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);

        return Jwts.builder()
            .claims(claims)
            .subject(email)
            .issuedAt(now)
            .expiration(expiryDate)
            .signWith(getSigningKey())
            .compact();
    }

    public String generateRefreshToken(UUID userId, String email) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("type", "refresh");

        Date now = new Date();
        long refreshTokenExpiration = jwtExpiration * 7;
        Date expiryDate = new Date(now.getTime() + refreshTokenExpiration);

        return Jwts.builder()
            .claims(claims)
            .subject(email)
            .claim("userId", userId.toString())
            .issuedAt(now)
            .expiration(expiryDate)
            .signWith(getSigningKey())
            .compact();
    }

    public UUID getUserIdFromToken(String token) {
        try {
            Claims claims = getAllClaimsFromToken(token);
            String userId = (String) claims.get("userId");
            return UUID.fromString(userId);
        } catch (Exception e) {
            log.error("Error extracting userId from token", e);
            return null;
        }
    }

    public String getEmailFromToken(String token) {
        try {
            Claims claims = getAllClaimsFromToken(token);
            return claims.getSubject();
        } catch (Exception e) {
            log.error("Error extracting email from token", e);
            return null;
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token);
            return true;
        } catch (SecurityException e) {
            log.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("Expired JWT token: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("Unsupported JWT token: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }

    public boolean isTokenExpired(String token) {
        try {
            Claims claims = getAllClaimsFromToken(token);
            return claims.getExpiration().before(new Date());
        } catch (ExpiredJwtException e) {
            return true;
        } catch (Exception e) {
            log.error("Error checking token expiration", e);
            return true;
        }
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Long getTokenExpirationSeconds(String token) {
        try {
            Claims claims = getAllClaimsFromToken(token);
            long expirationTime = claims.getExpiration().getTime();
            long currentTime = System.currentTimeMillis();
            return (expirationTime - currentTime) / 1000;
        } catch (Exception e) {
            log.error("Error calculating token expiration", e);
            return 0L;
        }
    }
}