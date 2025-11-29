# NOTE: Base
FROM node:24.11.1-alpine3.21 AS base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# NOTE: Dev
FROM base AS dev

RUN pnpm install

COPY . .

ENV NODE_ENV=dev

CMD ["pnpm", "start:dev"]

# NOTE: Build
FROM base AS build

RUN pnpm install

COPY . .

ENV CI=true
ENV NODE_ENV=production

RUN pnpm build

RUN pnpm prune --prod

# NOTE: Production
FROM node:24.11.1-alpine3.21 AS prod

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs

COPY --from=build --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nestjs:nodejs /app/dist ./dist

USER nestjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/api/v1/health || exit 1

CMD ["node", "dist/main.js"]
