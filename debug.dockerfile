FROM node:latest
WORKDIR /home/veetaha/my/projects/query-builder-website

EXPOSE ${PORT}

CMD ["npm", "run", "backend:container:dev"]