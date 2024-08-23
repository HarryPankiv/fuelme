# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev
RUN npm install -g @nestjs/cli

# Copy the rest of the application code to the working directory
COPY . .

# Build the Nest.js application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Switch to root to run the application
USER root

# Copy an entrypoint script
COPY entrypoint.sh /usr/local/bin/

# Make the script executable
RUN chmod +x /usr/local/bin/entrypoint.sh

# Define the command to run the entrypoint script
CMD ["entrypoint.sh"]
