FROM node:18 as base

WORKDIR /front
COPY package*.json /front
EXPOSE 3000

FROM base as production
ENV NEXT_TELEMETRY_DISABLED 1
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
RUN npm install -g typescript ts-node @types/node @types/react @types/react-burger-menu @types/react-dom
RUN npm install
RUN npm install sharp
ENV NODE_ENV=production
COPY api /front/api
COPY components /front/components
COPY contexts /front/contexts
COPY data /front/data
COPY pages /front/pages
COPY public /front/public
COPY styles /front/styles
COPY tsconfig.json /front/
COPY next.config.js /front/
COPY next-sitemap.config.js /front/
COPY .env.local /front/
# RUN npm run build
# RUN npm run postbuild
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# RUN chown -R nextjs:nodejs ./.next
# USER nextjs
ENV PORT 3000
# CMD ["next", "start"]
CMD ["tail", "-f", "/dev/null"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY api /front/api
COPY components /front/components
COPY contexts /front/contexts
COPY data /front/data
COPY pages /front/pages
COPY public /front/public
COPY styles /front/styles
COPY tsconfig.json /front/
COPY next.config.js /front/
COPY .env.local /front/
CMD ["next", "dev"]
