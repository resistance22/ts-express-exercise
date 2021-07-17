FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./

RUN ["npm", "install", "--production"]

COPY ./dist/ ./dist/

ENV SERVER_PORT=4000
ENV SERVER_HOST=0.0.0.0
ENV FORCE_COLOR=1
ENV DATABASE_URI='mongodb://172.17.0.2:27017/tsapp'

EXPOSE 4000

CMD ["npm", "start"]