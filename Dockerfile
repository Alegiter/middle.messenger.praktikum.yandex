FROM node:12

WORKDIR /messenger
COPY . .

RUN npm i

CMD npm start -- --port $PORT --host elated-davinci-b5b9aa.herokuapp.com
