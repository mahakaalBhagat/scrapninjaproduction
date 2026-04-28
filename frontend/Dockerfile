# syntax=docker/dockerfile:1

# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install all deps (including devDependencies needed for Next.js build)
COPY package*.json ./
RUN npm ci

COPY . .

# Bake the API URL at build time (NEXT_PUBLIC_* are inlined by Next.js compiler)
ARG NEXT_PUBLIC_API_URL=http://localhost/api
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# Production runner stage
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["npm", "start"]
