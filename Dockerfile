# Use a Node.js base image suitable for production builds
FROM node:20-bookworm-slim AS deps
WORKDIR /app

# Install dependencies based on the lockfile to ensure reproducibility
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-bookworm-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Reuse installed dependencies from the previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js application
RUN npm run build

FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3003

# Copy the lockfile and install only production dependencies
COPY package.json package-lock.json ./
COPY --from=deps /app/node_modules ./node_modules
RUN npm prune --omit=dev

# Bring in the build artifacts and public assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Ensure the non-root user can run the app
RUN chown -R node:node /app
USER node

EXPOSE 3003
CMD ["npm", "run", "start", "--", "-p", "3003"]
