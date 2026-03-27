#!/bin/bash
set -e

# ========================================
# LERO Task Runner
# Usage: ./run_tasks.sh tasks.json [--dry-run]
# ========================================

TASKS_FILE="$1"
DRY_RUN=false

if [[ "$2" == "--dry-run" ]]; then
  DRY_RUN=true
fi

if [ -z "$TASKS_FILE" ]; then
  echo "Usage: $0 <tasks.json> [--dry-run]"
  exit 1
fi

if [ ! -f "$TASKS_FILE" ]; then
  echo "Tasks file not found: $TASKS_FILE"
  exit 1
fi

echo "==== LERO Task Runner ===="
echo "Tasks file: $TASKS_FILE"
if [ "$DRY_RUN" = true ]; then
  echo "Dry run mode: ON"
fi

# Track completed tasks
declare -A COMPLETED

# Function to run a single task with dependency resolution
run_task() {
  local task_name="$1"

  # Skip if already completed
  if [[ ${COMPLETED["$task_name"]} ]]; then
    return
  fi

  # Resolve dependencies
  local deps
  deps=$(jq -r ".tasks[] | select(.name==\"$task_name\") | .depends_on[]?" "$TASKS_FILE")
  for dep in $deps; do
    run_task "$dep"
  done

  # Get the command
  local cmd
  cmd=$(jq -r ".tasks[] | select(.name==\"$task_name\") | .command" "$TASKS_FILE")

  # Run the command
  echo "---- Running task: $task_name ----"
  echo "$cmd"
  if [ "$DRY_RUN" = false ]; then
    eval "$cmd"
  fi
  COMPLETED["$task_name"]=1
}

# Get all task names
TASK_NAMES=$(jq -r '.tasks[].name' "$TASKS_FILE")

# Run all tasks
for task in $TASK_NAMES; do
  run_task "$task"
done

echo "==== All tasks completed ===="