#!/bin/bash
set -e

SRC_DIR="src"
OUTPUT_DIR="output"

echo "==== Step 1: Build TypeScript emitter ===="
npm run build

echo "==== Step 2: Ensure output directory exists ===="
mkdir -p "$OUTPUT_DIR"

echo "==== Step 3: Cleaning output directory ===="
rm -rf "$OUTPUT_DIR"/*

echo "==== Step 4: Compile TypeSpec and run emitter ===="
npx tsp compile "$SRC_DIR/main.tsp"

echo "==== Step 5: Verify output files ===="

EXPECTED_FILES=(
  "tasks.json"
  "docker-volumes.yml"
  "docker-services.yml"
  "smb.conf"
  "exports"
)

for file in "${EXPECTED_FILES[@]}"; do
  if [ -f "$OUTPUT_DIR/$file" ]; then
    echo "✔ Found $file"
  else
    echo "✖ Missing $file"
  fi
done

echo "==== Build complete ===="
