FROM node:latest
WORKDIR /usr/app

COPY . .

# workaround npm install --prefix warning
RUN npm set unsafe-perm true 

RUN npm install

EXPOSE ${PORT}

RUN npm run build

CMD ["npm", "run", "start"]