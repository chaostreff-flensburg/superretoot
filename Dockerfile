FROM node:19-alpine3.16
WORKDIR /app
COPY . ./
RUN npm ci
CMD ["node", "index.mjs"]
