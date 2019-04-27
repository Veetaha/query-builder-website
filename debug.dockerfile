FROM node:latest
WORKDIR /home/veetaha/my/projects/query-builder-website

COPY . .

# workaround npm install --prefix warning
RUN npm set unsafe-perm true 

RUN npm install

EXPOSE ${PORT}

RUN npm run build

CMD ["npm", "run", "dev"]