FROM node

EXPOSE 80

RUN mkdir -p /usr/src/sintetic.ai/qa/front

WORKDIR /usr/src/sintetic.ai/qa/front

COPY . .

RUN npm install -g typescript

RUN yarn install && yarn build

CMD [ "yarn", "preview"]
