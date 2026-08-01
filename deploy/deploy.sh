#!/usr/bin/env bash
set -euo pipefail

# Deploy static build to VPS
# Usage: ./deploy/deploy.sh user@your-vps-ip

VPS="${1:-user@your-vps-ip}"
REMOTE_DIR="/var/www/bechir-portfolio"

echo "Building locally..."
npm run build

echo "Syncing dist/ to ${VPS}:${REMOTE_DIR}..."
rsync -avz --delete dist/ "${VPS}:${REMOTE_DIR}/"

echo "Done. Site deployed to ${REMOTE_DIR}"
