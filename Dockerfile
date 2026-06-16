# ================================
# Next.js 15 production image (standalone output)
# ================================

# Stage 1: Build
FROM node:22-alpine AS builder

# libc6-compat helps some native deps under alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies from the lockfile
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build-time configuration. Next.js evaluates rewrites() and inlines
# NEXT_PUBLIC_* at build time, so these must be present BEFORE `next build`.
#   BASE_URL             -> server-side rewrite target (/api/* -> backend)
#   NEXT_PUBLIC_BASE_URL -> inlined into the client bundle
ARG BASE_URL
ARG NEXT_PUBLIC_BASE_URL
ENV BASE_URL=$BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ================================
# Stage 2: Runtime
# ================================
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001
ENV HOSTNAME=0.0.0.0

# Non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy the standalone server, static assets, and public files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3001

# server.js is emitted by Next.js standalone output
CMD ["node", "server.js"]
