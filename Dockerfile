FROM node:10-alpine

# Build arguments
ARG NODE_ENV=production

# Set necessary environment variables.
ENV NODE_ENV=$NODE_ENV

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8089

CMD [ "npm", "start" ]
