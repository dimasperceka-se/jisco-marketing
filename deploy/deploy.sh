#!/usr/bin/env bash
# Deploy / redeploy the JISCo marketing site on an Ubuntu server.
# Idempotent: safe to run repeatedly (first run sets everything up, later runs pull + rebuild).
#
#   bash deploy/deploy.sh
#
set -euo pipefail

REPO="https://github.com/dimasperceka-se/jisco-marketing.git"
APP_DIR="/var/www/jisco.online"
DOMAIN="jisco.online"
NGINX_CONF="/etc/nginx/sites-available/${DOMAIN}"

echo "==> 1/5  Clone or update the repo at ${APP_DIR}"
if [ ! -d "${APP_DIR}/.git" ]; then
  sudo mkdir -p "${APP_DIR}"
  sudo chown -R "$(id -un):$(id -gn)" "${APP_DIR}"
  git clone "${REPO}" "${APP_DIR}"
else
  git -C "${APP_DIR}" pull --ff-only
fi
cd "${APP_DIR}"

echo "==> 2/5  Ensure Node.js 24 + pnpm"
if ! command -v node >/dev/null 2>&1 || [ "$(node -v | sed 's/v\([0-9]*\).*/\1/')" -lt 24 ]; then
  curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
sudo corepack enable
corepack prepare pnpm@latest --activate

echo "==> 3/5  Install dependencies and build the site"
pnpm install --frozen-lockfile
pnpm --filter @workspace/jisco-website run build
# Build output: ${APP_DIR}/artifacts/jisco-website/dist/public

echo "==> 4/5  Ensure nginx server block (first-time only)"
if ! command -v nginx >/dev/null 2>&1; then
  sudo apt-get update && sudo apt-get install -y nginx
fi
# IMPORTANT: only install our HTTP-only conf on the FIRST run. After certbot adds
# the HTTPS (listen 443 ssl) block to this same file, re-copying would clobber it
# and break HTTPS. So on redeploys we leave the existing config untouched.
if [ ! -e "${NGINX_CONF}" ]; then
  sudo cp "${APP_DIR}/deploy/nginx/${DOMAIN}.conf" "${NGINX_CONF}"
  sudo ln -sf "${NGINX_CONF}" "/etc/nginx/sites-enabled/${DOMAIN}"
  echo "    Installed ${NGINX_CONF} (HTTP). Enable HTTPS once with:"
  echo "    sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
else
  echo "    ${NGINX_CONF} already exists — left untouched (preserves certbot HTTPS config)."
fi
# Make build output readable by the nginx worker user
sudo chmod o+rx /var/www "${APP_DIR}" "${APP_DIR}/artifacts" "${APP_DIR}/artifacts/jisco-website" "${APP_DIR}/artifacts/jisco-website/dist" 2>/dev/null || true

echo "==> 5/5  Test config and reload nginx"
sudo nginx -t
sudo systemctl reload nginx

echo ""
echo "Done. Site is served over HTTP at http://${DOMAIN}"
echo "Next:"
echo "  - Point DNS A/AAAA records for ${DOMAIN} and www.${DOMAIN} at this server's public IP."
echo "  - Enable HTTPS:  sudo apt-get install -y certbot python3-certbot-nginx && sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
