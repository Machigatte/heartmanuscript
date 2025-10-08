# Use official Node LTS image for build stage
FROM node:20-bullseye AS deps
WORKDIR /app

# Install dependencies based on lockfile if present to leverage caching
COPY package.json package-lock.json pnpm-lock.yaml ./
RUN if [ -f pnpm-lock.yaml ]; then \
      npm install -g pnpm && pnpm install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
      npm ci; \
    else \
      npm install; \
    fi

# Build stage
FROM node:20-bullseye AS builder
WORKDIR /app

# Copy source and installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app
ENV NODE_ENV=production
RUN npm run build

# Production image
FROM node:20-bullseye-slim AS runner
WORKDIR /app

# Copy only what's needed for production runtime
ENV NODE_ENV=production
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# If you expose a custom port, change PORT accordingly. Next.js default is 3000
ENV PORT 3000
EXPOSE 3000

# Use a non-root user for better security
RUN groupadd -r nextjs && useradd -r -g nextjs nextjs && chown -R nextjs:nextjs /app
USER nextjs

CMD ["npm", "start"]
