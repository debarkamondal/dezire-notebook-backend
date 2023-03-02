FROM node:18.14.2-alpine3.17

USER node

RUN mkdir -p /home/node/app/node_modules && chown node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

RUN yarn install

CMD ["node", "index.js"]