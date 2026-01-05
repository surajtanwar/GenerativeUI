# Deployment Guide - Generative UI Application

This guide covers multiple hosting options to deploy your Generative UI application on the internet.

## Prerequisites

Before deploying, ensure you have:

1. **Required Environment Variables:**
   - `OPENAI_API_KEY` (Required) - Get from [OpenAI Dashboard](https://platform.openai.com/login?launch)
   - `GITHUB_TOKEN` (Optional) - For GitHub tool functionality
   - `GEOCODE_API_KEY` (Optional) - For weather tool
   - `FIRECRAWL_API_KEY` (Optional) - For web scraping tool
   - `LANGCHAIN_API_KEY` (Optional) - For LangSmith tracing
   - `LANGCHAIN_CALLBACKS_BACKGROUND` (Optional) - Set to `true`
   - `LANGCHAIN_TRACING_V2` (Optional) - Set to `true`

2. **Build the application locally first:**
   ```bash
   yarn build
   ```
   Ensure the build completes without errors.

---

## Option 1: Vercel (Recommended - Easiest for Next.js)

Vercel is the easiest option for Next.js applications with zero configuration.

### Steps:

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "Add New Project"
   - Import your repository
   - Configure environment variables:
     - Go to Settings → Environment Variables
     - Add all required environment variables
   - Click "Deploy"

3. **One-Click Deploy (Alternative):**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbracesproul%2Fgen-ui&env=GITHUB_TOKEN,OPENAI_API_KEY,GEOCODE_API_KEY,FIRECRAWL_API_KEY,LANGCHAIN_API_KEY,LANGCHAIN_CALLBACKS_BACKGROUND,LANGCHAIN_TRACING_V2&project-name=gen-ui&repository-name=gen-ui)

### Advantages:
- ✅ Zero configuration
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Free tier available
- ✅ Built-in analytics

### Pricing:
- Free tier: Unlimited personal projects
- Pro: $20/month for team features

---

## Option 2: Railway

Railway provides simple deployment with good developer experience.

### Steps:

1. **Install Railway CLI (optional):**
   ```bash
   npm i -g @railway/cli
   ```

2. **Deploy via Railway Dashboard:**
   - Go to [railway.app](https://railway.app)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Environment Variables:**
   - Go to your project → Variables
   - Add all required environment variables

4. **Configure Build Settings:**
   - Build Command: `yarn build`
   - Start Command: `yarn start`
   - Output Directory: `.next`

5. **Deploy:**
   - Railway will automatically detect Next.js
   - It will build and deploy your app
   - You'll get a public URL

### Advantages:
- ✅ Simple setup
- ✅ Good free tier
- ✅ Automatic deployments
- ✅ Built-in database options

### Pricing:
- Free tier: $5 credit/month
- Pro: Pay as you go

---

## Option 3: Render

Render offers free tier with automatic SSL.

### Steps:

1. **Create Render Account:**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure Service:**
   - **Name:** Your app name
   - **Environment:** Node
   - **Build Command:** `yarn install && yarn build`
   - **Start Command:** `yarn start`
   - **Plan:** Free (or paid for better performance)

4. **Add Environment Variables:**
   - Go to Environment section
   - Add all required variables

5. **Deploy:**
   - Click "Create Web Service"
   - Render will build and deploy

### Advantages:
- ✅ Free tier available
- ✅ Automatic SSL
- ✅ Auto-deploy from Git
- ✅ Custom domains

### Pricing:
- Free tier: Available (with limitations)
- Starter: $7/month

---

## Option 4: DigitalOcean App Platform

Good for production deployments with scaling options.

### Steps:

1. **Create DigitalOcean Account:**
   - Go to [digitalocean.com](https://www.digitalocean.com)
   - Sign up

2. **Create App:**
   - Go to App Platform
   - Click "Create App"
   - Connect GitHub repository

3. **Configure App:**
   - **Type:** Web Service
   - **Build Command:** `yarn build`
   - **Run Command:** `yarn start`
   - **Environment Variables:** Add all required vars

4. **Deploy:**
   - Review and create
   - DigitalOcean will build and deploy

### Advantages:
- ✅ Production-ready
- ✅ Auto-scaling
- ✅ Database options
- ✅ Good performance

### Pricing:
- Basic: $5/month
- Professional: Starts at $12/month

---

## Option 5: Self-Hosted (VPS/Docker)

For full control, deploy on your own server.

### Using Docker:

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:20-alpine AS base

   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY package.json yarn.lock* ./
   RUN yarn install --frozen-lockfile

   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN yarn build

   # Production image
   FROM base AS runner
   WORKDIR /app

   ENV NODE_ENV production

   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs

   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

   USER nextjs

   EXPOSE 3000

   ENV PORT 3000
   ENV HOSTNAME "0.0.0.0"

   CMD ["node", "server.js"]
   ```

2. **Update next.config.mjs:**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'standalone',
   };

   export default nextConfig;
   ```

3. **Create docker-compose.yml:**
   ```yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - OPENAI_API_KEY=${OPENAI_API_KEY}
         - GITHUB_TOKEN=${GITHUB_TOKEN}
         - GEOCODE_API_KEY=${GEOCODE_API_KEY}
         - FIRECRAWL_API_KEY=${FIRECRAWL_API_KEY}
       restart: unless-stopped
   ```

4. **Deploy:**
   ```bash
   docker-compose up -d
   ```

### Using PM2 (Process Manager):

1. **Install PM2:**
   ```bash
   npm install -g pm2
   ```

2. **Build the app:**
   ```bash
   yarn build
   ```

3. **Start with PM2:**
   ```bash
   pm2 start yarn --name "gen-ui" -- start
   pm2 save
   pm2 startup
   ```

4. **Setup Nginx (Reverse Proxy):**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Advantages:
- ✅ Full control
- ✅ No vendor lock-in
- ✅ Customizable

### Requirements:
- VPS (DigitalOcean, AWS EC2, Linode, etc.)
- Domain name (optional)
- SSL certificate (Let's Encrypt)

---

## Option 6: AWS (EC2/Amplify/Lambda)

For enterprise-grade deployments.

### AWS Amplify (Easiest AWS option):

1. **Go to AWS Amplify Console:**
   - Sign in to AWS
   - Navigate to AWS Amplify
   - Click "New app" → "Host web app"

2. **Connect Repository:**
   - Connect GitHub
   - Select repository and branch

3. **Configure Build:**
   - Build settings are auto-detected
   - Add environment variables

4. **Deploy:**
   - Review and deploy

### Advantages:
- ✅ Enterprise-grade
- ✅ Scalable
- ✅ AWS ecosystem integration

### Pricing:
- Pay as you go
- Free tier available

---

## Environment Variables Setup

Regardless of hosting platform, you need to set these environment variables:

### Required:
```bash
OPENAI_API_KEY=sk-...
```

### Optional (for full functionality):
```bash
GITHUB_TOKEN=ghp_...
GEOCODE_API_KEY=...
FIRECRAWL_API_KEY=...
LANGCHAIN_API_KEY=...
LANGCHAIN_CALLBACKS_BACKGROUND=true
LANGCHAIN_TRACING_V2=true
```

---

## Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Test the application on the deployed URL
- [ ] Check that OpenAI API calls are working
- [ ] Test weather tool (if GEOCODE_API_KEY is set)
- [ ] Test GitHub tool (if GITHUB_TOKEN is set)
- [ ] Test menu generator with different roles
- [ ] Verify role-based theming is working
- [ ] Set up custom domain (if needed)
- [ ] Configure SSL/HTTPS (usually automatic)
- [ ] Set up monitoring/analytics

---

## Troubleshooting

### Build Fails:
- Check Node.js version (requires 18+)
- Ensure all dependencies are in package.json
- Check for TypeScript errors: `yarn lint`

### Runtime Errors:
- Verify all environment variables are set
- Check application logs in hosting platform
- Ensure API keys are valid

### API Errors:
- Verify OpenAI API key is correct
- Check API rate limits
- Ensure billing is set up for OpenAI account

---

## Quick Start (Vercel - Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Add environment variables
5. Deploy

Your app will be live at: `https://your-app-name.vercel.app`

---

## Need Help?

- Check Next.js deployment docs: https://nextjs.org/docs/deployment
- Vercel deployment guide: https://vercel.com/docs
- Application README: See README.md




