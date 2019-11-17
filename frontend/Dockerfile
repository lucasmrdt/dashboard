FROM node:11.2.0

WORKDIR /frontend

COPY package.json .

RUN npm install --silent

COPY . .

CMD ["npm", "start"]
