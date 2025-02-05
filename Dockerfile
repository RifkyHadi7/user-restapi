# Use Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install postgresql-client to use pg_isready
RUN apk add --no-cache postgresql-client

# Copy package.json and package-lock.json files into the container
COPY package*.json ./

# Install the required dependencies
RUN npm install

# Copy all application source files into the container
COPY . .

# Install additional required dependencies
RUN npm install @nestjs/passport passport passport-jwt \
  @nestjs/jwt jsonwebtoken bcryptjs class-validator class-transformer

# Build the NestJS application
RUN npm run build

# Expose the port used by the application
EXPOSE ${PORT}
