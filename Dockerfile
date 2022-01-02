FROM node:16.13.0-alpine

WORKDIR /usr/app
COPY ./package.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["npm", "start:dev"]