FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install
RUN npm install bcrypt

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]