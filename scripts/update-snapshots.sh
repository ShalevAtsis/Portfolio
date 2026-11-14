#!/usr/bin/env bash
# Regenerate the Linux pixel baselines inside the same Docker image CI uses,
# so local macOS/Windows machines never produce platform-specific snapshots.
#
#   npm run test:visual:update
#
set -euo pipefail
cd "$(dirname "$0")/.."

PW_VERSION=$(node -p "require('./node_modules/@playwright/test/package.json').version")
IMAGE="mcr.microsoft.com/playwright:v${PW_VERSION}-noble"

docker run --rm --ipc=host \
  -v "$PWD":/work -w /work \
  -v portfolio_node_modules:/work/node_modules \
  -v portfolio_next:/work/.next \
  -v portfolio_out:/work/out \
  -e CI=1 \
  "$IMAGE" \
  bash -c 'npm ci --no-audit --no-fund && npx playwright test --project="Desktop Chrome" --grep "\[PIXEL\]" --update-snapshots --retries=0 --reporter=line "$@"' -- "$@"
