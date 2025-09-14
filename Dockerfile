
FROM node:24-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm i
COPY . .
RUN pnpm build
EXPOSE 5173
CMD [ "pnpm", "preview", "--host", "--port", "5173" ]
