FROM node:latest

WORKDIR /usr/app

COPY package.json package.json

RUN npm install

COPY . .

RUN npm install -g nodemon

ENV MONGODB_URI=mongodb://mongo:27017/board-swap
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "start" ]