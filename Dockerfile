# Check out https://hub.docker.com/_/node to select a new base image
FROM node:16-slim

# Set to a non-root built-in user `node`
#USER node

# Create app directory (with user `node`)
#RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Variables
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY --chown=node package*.json ./
COPY package.json /usr/src/app/

RUN id -un
RUN npm install --location=global npm@8.17.0
RUN npm install
RUN npm install -g @loopback/cli
RUN npm install pm2 -g
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:rotateInterval '0 0 */1 * *'
RUN pm2 set pm2-logrotate:dateFormat 'YYYY-MM-DD'

# Bundle app source code
#COPY --chown=node . .
COPY . /usr/src/app

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3105

#EXPOSE ${PORT}
EXPOSE 3105
#CMD [ "node", "." ]
