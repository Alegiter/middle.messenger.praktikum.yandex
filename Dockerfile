FROM node:12

WORKDIR /messenger
COPY . .

RUN npm i

EXPOSE 3000

CMD ["npm", "start"]
