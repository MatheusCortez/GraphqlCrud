FROM node:16-alpine

WORKDIR /home/api

RUN npm install -g npm@8.5.5

COPY package.json .

RUN npm install 

COPY . .

CMD npm run start:dev