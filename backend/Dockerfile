FROM node:11.2.0

WORKDIR /backend

COPY package.json .

RUN npm install --silent

COPY . .

CMD ["npm", "run", "dev"]
