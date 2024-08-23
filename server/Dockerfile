# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Install dependencies for PostgreSQL
RUN apk add --no-cache postgresql postgresql-contrib

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
EXPOSE 3000 5432

# Define environment variables for PostgreSQL
ENV POSTGRES_USER=harry
ENV POSTGRES_PASSWORD=Welcome1!
ENV POSTGRES_DB=fuelmedb
ENV POSTGRES_PORT=5432

# Set up PostgreSQL data directory
RUN mkdir -p /var/lib/postgresql/data \
    && chown -R postgres:postgres /var/lib/postgresql

USER postgres

# Initialize PostgreSQL and start the service
RUN initdb -D /var/lib/postgresql/data

# Switch back to root to run both PostgreSQL and the application
USER root

# Copy an entrypoint script
COPY entrypoint.sh /usr/local/bin/

# Make the script executable
RUN chmod +x /usr/local/bin/entrypoint.sh

# Define the command to run the entrypoint script
CMD ["entrypoint.sh"]
