# Setup Guide for Cloudflare Workers Authentication

This guide will help you deploy the Cloudflare Worker for serverless API authentication and configure the application.

## Prerequisites

- Cloudflare account (free tier works fine)
- Node.js 16+ and npm
- Wrangler CLI (`npm install -g wrangler`)
- OpenRouter API key ([Get one here](https://openrouter.ai/keys))

## Step 1: Deploy Cloudflare Worker

### 1.1 Install Wrangler CLI

```bash
npm install -g wrangler
```

### 1.2 Login to Cloudflare

```bash
wrangler login
```

This will open a browser window for authentication.

### 1.3 Deploy the Worker

From the project root directory:

```bash
wrangler deploy
```

The worker will be deployed to a URL like:
```
https://sunoai-music-muse-api.YOUR_SUBDOMAIN.workers.dev
```

**Note down this URL** - you'll need it for the frontend configuration.

## Step 2: Configure Secrets

Set the required environment variables as Cloudflare Worker secrets:

### 2.1 Set Authentication Token

Choose a secure random token for user authentication:

```bash
wrangler secret put AUTH_TOKEN
```

When prompted, enter your chosen token (e.g., a random UUID or secure password).

**Important**: Share this token securely with authorized users. They will need it to log in to the application.

### 2.2 Set OpenRouter API Key

```bash
wrangler secret put OPENROUTER_API_KEY
```

When prompted, enter your OpenRouter API key (starts with `sk-or-v1-...`).

## Step 3: Configure Frontend

### 3.1 Create .env file

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### 3.2 Update Worker URL

Edit `.env` and replace `YOUR_SUBDOMAIN` with your actual Cloudflare subdomain:

```env
VITE_WORKER_API_URL=https://sunoai-music-muse-api.YOUR_SUBDOMAIN.workers.dev
```

## Step 4: Build and Deploy Frontend

### 4.1 Install Dependencies

```bash
npm install
```

### 4.2 Build for Production

```bash
npm run build
```

### 4.3 Deploy to GitHub Pages

The built files in the `dist/` directory can be deployed to GitHub Pages or any static hosting service.

For GitHub Pages:
1. Enable GitHub Pages in your repository settings
2. Set the source to the `gh-pages` branch or `dist/` folder
3. Push your changes

## Step 5: User Access

### Distributing Access Tokens

1. Share the `AUTH_TOKEN` you configured in Step 2.1 with authorized users
2. Users will be prompted to enter this token when they first visit the application
3. The token is stored locally in the browser and persists across sessions
4. Users can log out at any time using the logout button in the header

### Security Best Practices

- **Never commit secrets to the repository**
- Use strong, random tokens for `AUTH_TOKEN`
- Rotate the `AUTH_TOKEN` periodically
- Monitor Worker usage through Cloudflare dashboard
- Consider implementing rate limiting for production use

## Troubleshooting

### Worker deployment fails

- Ensure you're logged in: `wrangler whoami`
- Check wrangler.toml configuration
- Verify Node.js version is 16+

### Authentication not working

- Verify secrets are set: `wrangler secret list`
- Check browser console for error messages
- Ensure Worker URL is correct in `.env`

### API requests failing

- Check Cloudflare Worker logs: `wrangler tail`
- Verify OpenRouter API key is valid
- Check CORS headers in browser devtools

## Cost Considerations

### Cloudflare Workers Free Tier

- 100,000 requests per day
- 10ms CPU time per request
- More than sufficient for personal/small team use

### OpenRouter API Costs

- Varies by model selected
- Monitor usage in OpenRouter dashboard
- Set up billing alerts

## Advanced Configuration

### Custom Domain

You can configure a custom domain for your Worker:

1. Go to Cloudflare Dashboard > Workers & Pages
2. Select your worker
3. Add custom domain under Settings > Triggers

Update `.env` with your custom domain.

### Multiple Authentication Tokens

To support multiple users with different tokens, modify `workers/generate.ts`:

```typescript
const VALID_TOKENS = [
  process.env.AUTH_TOKEN_1,
  process.env.AUTH_TOKEN_2,
  // Add more tokens
]

if (!VALID_TOKENS.includes(token)) {
  // reject
}
```

Then set multiple secrets:
```bash
wrangler secret put AUTH_TOKEN_1
wrangler secret put AUTH_TOKEN_2
```

### Rate Limiting

For production use, consider adding rate limiting to prevent abuse. See [Cloudflare Workers Rate Limiting](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/) documentation.

## Support

For issues or questions:
- Check Cloudflare Workers documentation: https://developers.cloudflare.com/workers/
- Review OpenRouter documentation: https://openrouter.ai/docs
- Open an issue in the GitHub repository
