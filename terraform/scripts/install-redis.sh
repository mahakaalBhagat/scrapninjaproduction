#!/bin/bash
# Redis Installation Script for EC2
# This script installs and configures Redis on an EC2 instance

set -e

echo "Installing Redis..."

# Update system
yum update -y
yum install -y gcc tcl wget

# Download and compile Redis
cd /tmp
wget http://download.redis.io/redis-stable.tar.gz
tar -xzf redis-stable.tar.gz
cd redis-stable

# Build Redis
make
make test
make install

# Create redis user
useradd -r redis || true

# Create directories
mkdir -p /var/lib/redis
mkdir -p /var/log/redis
chown redis:redis /var/lib/redis
chown redis:redis /var/log/redis

# Create Redis configuration
cat > /etc/redis/redis.conf << 'EOF'
# Redis Configuration for Production

# Server
port 6379
bind 0.0.0.0
timeout 0
tcp-keepalive 300

# Database
databases 16
save 900 1
save 300 10
save 60 10000
rdbcompression yes
dbfilename dump.rdb
dir /var/lib/redis

# Replication
slave-read-only yes
slave-serve-stale-data yes

# Memory Management
maxmemory 256mb
maxmemory-policy allkeys-lru

# Append Only File (AOF)
appendonly yes
appendfilename "appendonly.aof"
appendfsync everysec

# Logging
loglevel notice
logfile /var/log/redis/redis-server.log

# Security
requirepass ${REDIS_PASSWORD:-your-secure-password}

# Advanced Config
hash-max-ziplist-entries 512
hash-max-ziplist-value 64
list-max-ziplist-size -2
list-compress-depth 0
set-max-intset-entries 512
zset-max-ziplist-entries 128
zset-max-ziplist-value 64
activerehashing yes

# Slow Log
slowlog-log-slower-than 10000
slowlog-max-len 128

# Latency Monitor
latency-monitor-threshold 0

# Event Notification
notify-keyspace-events ""

# Lua Script
lua-time-limit 5000
EOF

# Create systemd service for Redis
cat > /etc/systemd/system/redis.service << 'SVCEOF'
[Unit]
Description=Redis In-Memory Data Store
After=network.target

[Service]
User=redis
ExecStart=/usr/local/bin/redis-server /etc/redis/redis.conf
ExecStop=/bin/kill -s TERM $MAINPID
Restart=on-failure
RestartSec=5s

# Security
ProtectSystem=full
ProtectHome=yes
NoNewPrivileges=yes

[Install]
WantedBy=multi-user.target
SVCEOF

# Enable and start Redis
systemctl daemon-reload
systemctl enable redis.service
systemctl start redis.service

# Verify Redis is running
redis-cli ping

echo "✓ Redis installed and running on port 6379"
echo "✓ Redis configuration saved to /etc/redis/redis.conf"
echo "✓ Redis logs available at /var/log/redis/redis-server.log"

# Test connection
echo "Testing Redis connection..."
redis-cli info server | head -5
