FROM node:latest
WORKDIR /home/veetaha/my/projects/ts-nestjs-angular-template

COPY . .

# workaround npm install --prefix warning
RUN npm set unsafe-perm true 

RUN npm install

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "dev"]