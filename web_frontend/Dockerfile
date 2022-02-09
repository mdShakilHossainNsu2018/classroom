#FROM node:lts-alpine
FROM node:12
COPY package.json ./

RUN mkdir /app
COPY . /app
WORKDIR /app
RUN  npm install
EXPOSE 8080
#RUN npm install -g @vue/cli
CMD ["npm", "run", "serve"]
