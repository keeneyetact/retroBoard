# This must be run with the Docker context set to the root folder of the repository
# (the one with the yarn.lock file)

FROM node:14-alpine

# App directory
WORKDIR /usr/src/backend

# Install Python and build base, needed for bcrypt on ARM (go figure)
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN apk add build-base

# Install Yarn
RUN apk add yarn

COPY ./yarn.lock ./
COPY ./package.json ./
COPY ./retro-board-server/package.json ./retro-board-server/
COPY ./retro-board-common/package.json ./retro-board-common/

RUN yarn --network-timeout 1000000 install

COPY ./retro-board-server ./retro-board-server
COPY ./retro-board-common ./retro-board-common

RUN yarn build-server

EXPOSE ${BACKEND_PORT}
CMD [ "yarn", "start-server-production" ]