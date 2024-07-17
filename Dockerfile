# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Build the app
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Serve the static site
CMD ["serve", "-s", "build"]
