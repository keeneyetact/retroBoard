FROM node:12-alpine

# App directory
WORKDIR /usr/src/backend

RUN apk add yarn

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./retro-board-server/package.json ./retro-board-server/
COPY ./retro-board-common/package.json ./retro-board-common/

RUN yarn install

COPY ./retro-board-server ./retro-board-server
COPY ./retro-board-common ./retro-board-common

# Arguments (these are default but can be overridden)
ENV DB_TYPE=postgres
ENV DB_NAME=retroboard
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV BACKEND_PORT=3005
ENV NODE_ENV=production
ENV SQL_LOG=false

RUN yarn build-server

EXPOSE ${BACKEND_PORT}
CMD [ "yarn", "start-server-production" ]