FROM node:12-alpine as Node

ARG GoogleAnalytics
ENV REACT_APP_GA_ID "$GoogleAnalytics"
ENV NODE_ENV=production

WORKDIR /home/node/app
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./retro-board-app/package.json ./retro-board-app/
COPY ./retro-board-common/package.json ./retro-board-common/

RUN chown -R node:node /home/node/app

USER node

RUN yarn install

COPY --chown=node:node ./retro-board-app ./retro-board-app
COPY --chown=node:node ./retro-board-common ./retro-board-common

RUN yarn build-ui

FROM nginx:alpine
COPY --from=Node /home/node/app/retro-board-app/build /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf