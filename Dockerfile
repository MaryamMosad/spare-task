FROM node:24.2.0-alpine3.21

WORKDIR ./app


COPY package*.json ./

RUN npm i

COPY . .

CMD ["npm" ,"run" ,"start:dev"]