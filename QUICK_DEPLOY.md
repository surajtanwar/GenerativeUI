# Quick Deployment Guide

## Fastest Way: Vercel (5 minutes)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready to deploy"
   git push origin main
   ```

2. **Deploy:**
   - Visit: https://vercel.com/new
   - Click "Import Git Repository"
   - Select your repository
   - Add environment variables:
     ```
     OPENAI_API_KEY=sk-...
     ```
   - Click "Deploy"

3. **Done!** Your app is live at `https://your-app.vercel.app`

---

## Using Docker (Self-Hosted)

1. **Build and run:**
   ```bash
   # Create .env file with your API keys
   cp .env.example .env
   # Edit .env with your keys
   
   # Build and run
   docker-compose up -d
   ```

2. **Access:** http://localhost:3000

3. **Stop:**
   ```bash
   docker-compose down
   ```

---

## Environment Variables Needed

**Minimum (Required):**
- `OPENAI_API_KEY` - Get from https://platform.openai.com

**Optional (for full features):**
- `GITHUB_TOKEN` - For GitHub tool
- `GEOCODE_API_KEY` - For weather tool
- `FIRECRAWL_API_KEY` - For web scraping

See `.env.example` for all variables.

---

## Other Hosting Options

See `DEPLOYMENT_GUIDE.md` for detailed instructions on:
- Railway
- Render
- DigitalOcean
- AWS
- Self-hosted VPS




