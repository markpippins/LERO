#!/bin/bash
set -e

# Root directory (current folder)
ROOT=$(pwd)

# --- src ---
mkdir -p "$ROOT/src/models" "$ROOT/src/operations"
touch "$ROOT/src/models/hosts.tsp" \
      "$ROOT/src/models/volumes.tsp" \
      "$ROOT/src/models/services.tsp" \
      "$ROOT/src/models/orchestration.tsp" \
      "$ROOT/src/operations/generateTasks.tsp" \
      "$ROOT/src/operations/generateDocker.tsp" \
      "$ROOT/src/operations/generateSamba.tsp" \
      "$ROOT/src/operations/generateNFS.tsp" \
      "$ROOT/src/operations/helpers.tsp" \
      "$ROOT/src/homelab_config.json"

# --- projections ---
mkdir -p "$ROOT/projections/docker/v1" "$ROOT/projections/docker/v2"
mkdir -p "$ROOT/projections/samba/v1" "$ROOT/projections/samba/v2"
mkdir -p "$ROOT/projections/nfs/v1" "$ROOT/projections/nfs/v2"
mkdir -p "$ROOT/projections/custom"

# --- output ---
mkdir -p "$ROOT/output"
touch "$ROOT/output/tasks.json" \
      "$ROOT/output/docker-volumes.yml" \
      "$ROOT/output/docker-services.yml" \
      "$ROOT/output/smb.conf"

# --- scripts ---
mkdir -p "$ROOT/scripts"
touch "$ROOT/scripts/build.sh" "$ROOT/scripts/homelab.sh"

# --- docs ---
mkdir -p "$ROOT/docs"
touch "$ROOT/docs/README.md" \
      "$ROOT/docs/USAGE.md" \
      "$ROOT/docs/TYPESPEC.md" \
      "$ROOT/docs/CONTRIBUTING.md"

echo "All folders and placeholder files created successfully!"
