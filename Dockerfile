# common build stage
FROM node:20.11.0-alpine3.19 as common-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# development stage
FROM common-build as development-build
ENV NODE_ENV development
COPY --from=common-build /app/.env ./
EXPOSE 5000
CMD [ "npm", "run", "dev" ]

# production stage
FROM node:20.11.0-alpine3.19 as production-build
ENV NODE_ENV production
WORKDIR /app
COPY --from=common-build /app/package*.json ./
RUN npm install --only=production
COPY --from=common-build /app/dist ./dist/
COPY --from=common-build /app/.env ./

RUN mkdir -p /app/dist/uploads && chown -R node:node /app/dist/uploads
USER node
EXPOSE 5000
CMD [ "npm", "start" ]

