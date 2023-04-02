#Each instruction in this file creates a new layer
#Here we are getting our node as Base image
FROM node:18.12.0
#Creating a new directory for app files and setting path in the container
# RUN mkdir -p /usr/src/app
#setting working directory in the container
WORKDIR /app
#copying the package.json file(contains dependencies) from project source dir to container dir
COPY package.json .
# installing the dependencies into the container
RUN npm install
#copying the source code of Application into the container dir
COPY . .
#container exposed network port number
EXPOSE 4000
#command to run within the container
# RUN npm run start:dev
CMD [ "npm", "run", "start:dev" ]