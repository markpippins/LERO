#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="$SCRIPT_DIR/../output"
BUILD_SCRIPT="$SCRIPT_DIR/build.sh"

SSH_USER="pi"

echo "==== LERO: Build Phase ===="
"$BUILD_SCRIPT"

echo "==== LERO: Deploy Phase ===="

# Extract host IPs from JSON (simple approach)
HOSTS=$(jq -r '.hosts[].ip' "$SCRIPT_DIR/../src/homelab_config.json")

for host in $HOSTS; do
  echo "---- Deploying to $host ----"

  # Copy generated files
  scp "$OUTPUT_DIR/tasks.json" "$SSH_USER@$host:/tmp/tasks.json" || true
  scp "$OUTPUT_DIR/docker-volumes.yml" "$SSH_USER@$host:/tmp/docker-volumes.yml" || true
  scp "$OUTPUT_DIR/docker-services.yml" "$SSH_USER@$host:/tmp/docker-services.yml" || true
  scp "$OUTPUT_DIR/smb.conf" "$SSH_USER@$host:/tmp/smb.conf" || true
  scp "$OUTPUT_DIR/exports" "$SSH_USER@$host:/tmp/exports" || true

  # Execute tasks remotely
  ssh "$SSH_USER@$host" << 'EOF'
    set -e
    echo "Running LERO tasks..."

    if [ -f /tmp/tasks.json ]; then
      echo "NOTE: tasks.json execution not yet implemented"
      # Future: parse JSON and execute commands
    fi

    # Apply Samba config (if present)
    if [ -f /tmp/smb.conf ]; then
      sudo mv /tmp/smb.conf /etc/samba/smb.conf
      sudo systemctl restart smbd || true
    fi

    # Apply NFS exports (if present)
    if [ -f /tmp/exports ]; then
      sudo mv /tmp/exports /etc/exports
      sudo exportfs -ra
      sudo systemctl restart nfs-kernel-server || true
    fi

    echo "Host setup complete."
EOF

done

echo "==== LERO deployment complete ===="