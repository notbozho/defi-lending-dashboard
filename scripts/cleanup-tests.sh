#!/bin/bash

# Cleanup script for test results and temporary files
# Removes artifacts from Vitest, Playwright, and other testing tools

set -e

echo "🧹 Cleaning up test results and temporary files..."

# Vitest artifacts
if [ -d ".vitest" ]; then
  rm -rf .vitest
  echo "✓ Removed .vitest/"
fi

# Coverage reports
if [ -d "coverage" ]; then
  rm -rf coverage
  echo "✓ Removed coverage/"
fi

# Playwright test results
if [ -d "test-results" ]; then
  rm -rf test-results
  echo "✓ Removed test-results/"
fi

# Playwright reports
if [ -d "playwright-report" ]; then
  rm -rf playwright-report
  echo "✓ Removed playwright-report/"
fi

# Playwright blob report
if [ -d "blob-report" ]; then
  rm -rf blob-report
  echo "✓ Removed blob-report/"
fi

# Vitest UI artifacts
if [ -d ".vitest-ui" ]; then
  rm -rf .vitest-ui
  echo "✓ Removed .vitest-ui/"
fi

# Generated screenshots and videos
if [ -d "screenshots" ]; then
  rm -rf screenshots
  echo "✓ Removed screenshots/"
fi

if [ -d "videos" ]; then
  rm -rf videos
  echo "✓ Removed videos/"
fi

# Jest/Vitest cache
if [ -d ".jest-cache" ]; then
  rm -rf .jest-cache
  echo "✓ Removed .jest-cache/"
fi

# Vitest debug files
rm -f *.debug.*
if [ $? -eq 0 ]; then
  echo "✓ Removed debug files"
fi

echo ""
echo "✨ Cleanup complete!"
