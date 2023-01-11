FROM node:18 as base

WORKDIR /app
COPY package*.json ./
EXPOSE 3000

FROM base as production
ENV NEXT_TELEMETRY_DISABLED 1
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
RUN npm install -g typescript ts-node @types/node @types/react @types/react-burger-menu @types/react-dom
RUN npm install
RUN npm install sharp
ENV NODE_ENV=production
COPY . ./
RUN npm run build
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs ./.next
USER nextjs
ENV PORT 3000
CMD ["next", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . ./
CMD ["next", "dev"]
