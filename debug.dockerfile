FROM node:11.15.0
WORKDIR /home/veetaha/my/projects/query-builder-website

EXPOSE ${PORT}

CMD ["npm", "run", "backend:container:dev"]