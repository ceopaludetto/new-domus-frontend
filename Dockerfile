FROM node:12

WORKDIR /usr/src/app

RUN [ -d "./dist" ] && rm -r ./dist || echo "Not exists, skipping"

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn clean && yarn build

EXPOSE 5000

CMD [ "yarn", "start:production" ]