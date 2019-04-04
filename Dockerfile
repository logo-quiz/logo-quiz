FROM node:8-alpine
ENV PORT 3333

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy npm package files
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy app files to container
COPY . .

# Build app
RUN npm run build:api

CMD ["npm", "run", "start:api:prod"]
