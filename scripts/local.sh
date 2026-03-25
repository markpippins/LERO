#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR/.."
OUTPUT_DIR="$PROJECT_ROOT/output"
BUILD_SCRIPT="$SCRIPT_DIR/build.sh"

echo "==== LERO: Local Build ===="
"$BUILD_SCRIPT"

echo "==== LERO: Local Apply ===="

# Apply Samba config
if [ -f "$OUTPUT_DIR/smb.conf" ]; then
  echo "Applying Samba config..."
  sudo cp "$OUTPUT_DIR/smb.conf" /etc/samba/smb.conf
  sudo systemctl restart smbd || true
fi

# Apply NFS exports
if [ -f "$OUTPUT_DIR/exports" ]; then
  echo "Applying NFS exports..."
  sudo cp "$OUTPUT_DIR/exports" /etc/exports
  sudo exportfs -ra
  sudo systemctl restart nfs-kernel-server || true
fi

# Docker volumes
if [ -f "$OUTPUT_DIR/docker-volumes.yml" ]; then
  echo "Creating Docker volumes..."
  docker compose -f "$OUTPUT_DIR/docker-volumes.yml" up -d || true
fi

# Docker services
if [ -f "$OUTPUT_DIR/docker-services.yml" ]; then
  echo "Deploying Docker services..."
  docker compose -f "$OUTPUT_DIR/docker-services.yml" up -d || true
fi

echo "==== LERO: Local setup complete ===="