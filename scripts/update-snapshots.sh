#!/usr/bin/env bash
# Regenerate the Linux pixel baselines inside the same Docker image CI uses,
# so macOS / Windows machines never produce platform-specific snapshots.
#
#   npm run test:visual:update
#
# The repository is copied into the container (the host's node_modules, .next
# and out are never touched) and only the snapshot folder is copied back.
set -euo pipefail
cd "$(dirname "$0")/.."

PW_VERSION=$(node -p "require('./package-lock.json').packages['node_modules/@playwright/test'].version")
IMAGE="mcr.microsoft.com/playwright:v${PW_VERSION}-noble"
SNAPSHOTS="tests/portfolio.spec.ts-snapshots"

docker run --rm --ipc=host \
  -v "$PWD":/src \
  -v portfolio_npm_cache:/root/.npm \
  -e CI=1 \
  "$IMAGE" \
  bash -c '
    set -euo pipefail
    mkdir -p /work && cd /src
    tar --exclude=./node_modules --exclude=./.next --exclude=./out --exclude=./.git \
        --exclude=./playwright-report --exclude=./test-results -cf - . | tar -xf - -C /work
    cd /work
    npm ci --no-audit --no-fund
    npx playwright test --project="Desktop Chrome" --grep "\[PIXEL\]" --update-snapshots --retries=0 --reporter=line
    mkdir -p "/src/'"$SNAPSHOTS"'"
    cp -f "'"$SNAPSHOTS"'"/*-linux.png "/src/'"$SNAPSHOTS"'/"
  '

echo "Updated baselines in $SNAPSHOTS"
