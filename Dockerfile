FROM node:8

ENV PORT=8080
EXPOSE $PORT

WORKDIR /usr/src/app

COPY package.json .

# install dependencies
RUN npm install

COPY . .

CMD [ "npm", "start" ]
