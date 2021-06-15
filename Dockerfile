# pull official base image
FROM node:12.18.3-alpine
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
# add app
COPY . ./
# Build Proses
RUN yarn build
#Expose Port
EXPOSE 3000
# start app
CMD ["yarn", "test:e2e"]
