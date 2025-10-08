# Use official Node LTS image for build stage
# Use a single builder stage that installs with npm and builds
FROM node:20-bullseye AS builder
WORKDIR /app

# Copy package files and install dependencies with npm
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy rest of the source and build
COPY . .
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
