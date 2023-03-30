FROM node

EXPOSE 5173

WORKDIR /frontend

COPY . .

RUN npm install -g typescript

RUN yarn install && yarn build

CMD [ "yarn", "preview"]
