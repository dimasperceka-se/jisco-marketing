# Deploying JISCo to the Ubuntu VM (jisco.online)

The site is a static Vite/React SPA. It builds to
`artifacts/jisco-website/dist/public` and is served by nginx.

## One-command deploy

On the VM (`ubuntu@VM-4-10-ubuntu`):

```bash
# Get the deploy script (first time only)
sudo mkdir -p /var/www/jisco.online && sudo chown -R "$USER":"$USER" /var/www/jisco.online
git clone https://github.com/dimasperceka-se/jisco-marketing.git /var/www/jisco.online
cd /var/www/jisco.online

# Run the deploy (installs Node 24 + pnpm + nginx, builds, configures nginx)
bash deploy/deploy.sh
```

Re-running `bash deploy/deploy.sh` later pulls the latest `main`, rebuilds, and reloads nginx.

## What the script does

1. Clone/refresh the repo at `/var/www/jisco.online`
2. Install Node.js 24 + pnpm (via NodeSource + corepack) if missing
3. `pnpm install --frozen-lockfile` and `pnpm --filter @workspace/jisco-website run build`
4. Install `deploy/nginx/jisco.online.conf` into nginx and enable the site
5. `nginx -t` + reload

## DNS

Point these records at the VM's public IP:

| Type | Name | Value            |
|------|------|------------------|
| A    | `@`  | <VM public IP>   |
| A    | `www`| <VM public IP>   |

## HTTPS (after DNS resolves)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d jisco.online -d www.jisco.online
```

## Manual steps (if you prefer not to use the script)

```bash
cd /var/www/jisco.online
corepack enable && corepack prepare pnpm@latest --activate
pnpm install --frozen-lockfile
pnpm --filter @workspace/jisco-website run build

sudo cp deploy/nginx/jisco.online.conf /etc/nginx/sites-available/jisco.online
sudo ln -sf /etc/nginx/sites-available/jisco.online /etc/nginx/sites-enabled/jisco.online
sudo nginx -t && sudo systemctl reload nginx
```

The nginx docroot is `/var/www/jisco.online/artifacts/jisco-website/dist/public`.
