# syntax=docker/dockerfile:1
# Build stage
FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /build

# Copy entire backend directory
COPY backend /build

# Build all modules so parent POM is resolved correctly
RUN --mount=type=cache,target=/root/.m2 \
    mvn clean install -DskipTests -q

# Runtime stage
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=builder /build/pricing-service/target/pricing-service-*.jar app.jar

EXPOSE 8083

ENTRYPOINT ["java", "-XX:+UseG1GC", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
