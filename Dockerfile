FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./

RUN ["npm", "install"]

COPY . .

RUN ["npm","run","build"]


ENV SERVER_PORT=4000
ENV SERVER_HOST=0.0.0.0
ENV FORCE_COLOR=1

EXPOSE 4000

RUN ["npm", "start"]