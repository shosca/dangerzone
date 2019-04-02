FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -d

COPY . .

EXPOSE 8001

CMD [ "npm", "run", "server" ]
