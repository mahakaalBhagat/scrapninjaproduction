# syntax=docker/dockerfile:1
FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /build

COPY backend /build

RUN --mount=type=cache,target=/root/.m2 \
    mvn clean install -DskipTests -q

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=builder /build/location-service/target/location-service-*.jar app.jar

EXPOSE 8084

ENTRYPOINT ["java", "-XX:+UseG1GC", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
