FROM node:12.16.1-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY configs ./configs
COPY nodemon.json ./
COPY tsconfig.json ./
COPY src ./src
EXPOSE 9090
CMD [ "npm", "start" ]
