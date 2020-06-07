FROM node:12-alpine

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

ENTRYPOINT ["yarn", "run:prod"]
